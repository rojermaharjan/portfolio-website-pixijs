import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Power2, Power3 } from 'gsap/all';

import { CanvasService } from './canvas.service';
import { PROJECTS } from '../data/projects';

declare let PIXI: any;
declare let TweenMax: any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  projects: any = PROJECTS;

  currentProjectIndex: number = 0;
  projectsArray: any = [];
  routeName: string;
  app: any = "";
  appW: number = 0;
  appH: number = 0;
  images: any = [];
  imagesUrl: any = [];
  bgContainer: any = "";
  maskContainer: any = "";
  projectsContainer: any = "";
  noiseFilterBg: any = "";
  rectContainer: any = "";
  rect: any = "";
  displacementSprite: any = "";
  displacementFilter: any = "";
  displacementSpeed: any = 1;
  maskBgHome: any = "";
  maskBgProject: any = "";
  padding: any = 25;
  mask: any = "";
  maskX: any = 0;
  maskY: any = 0;
  cursorContainer: any = "";
  cursorElm: any = {};
  cursorPos: any = {};
  allProjectsContainer: any = "";
  imagesAllProjects: any = [];
  containersAllProjects: any = [];
  lastAllProjectsIndex: number = 0;
  hoverDisplacementSprite: any = "";
  hoverDisplacementFilter: any = "";

  private _unsubscribeAll: Subject<any> = new Subject();

  @ViewChild('pixiContainer') pixiContainer: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public canvasService: CanvasService
  ) { }

  ngOnInit() {
    this.canvasService
      .currentProjectIndex$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((index) => {
        if (index != null) {
          this.currentProjectIndex = index;
        }
      });

    this.convertProjectsToArray();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map((data) => {
        return data.name;
      })
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((name) => {
        if (name) {
          this.routeName = name;
        }
      });

    this.initCanvas();
  }

  convertProjectsToArray() {
    for (let t in this.projects)
      if (this.projects.hasOwnProperty(t)) {
        let e = this.projects[t];
        this.projectsArray.push(e);
      }
  }

  initCanvas() {
    let t = "WebGL";
    PIXI.utils.isWebGLSupported() || (t = "canvas");
    PIXI.utils.sayHello(t);
    this.appW = window.innerWidth;
    this.appH = window.innerHeight;
    this.app = new PIXI.Application({
      antialias: true,
      transparent: true,
      resolution: 1
    });
    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(this.appW, this.appH);
    this.pixiContainer.nativeElement.appendChild(this.app.view);
    this.loadImages();
  }

  loadImages() {
    let q = this;
    for (let t in this.projects) {
      if (this.projects.hasOwnProperty(t)) {
        let e = this.projects[t];
        this.imagesUrl.push(e.images.main)
      }
    }
    PIXI.loader.on("progress", function (t, e) {
      q.canvasService.loadingProgress(parseInt(t.progress));
    });
    PIXI.loader.add(this.imagesUrl).add("/assets/images/sprite.png").add("/assets/images/displace.png").load(this.setup);
  }

  setup = () => {
    this.initBackground();
    this.initRect();
    this.initProjectsImages();
    this.initAllProjects();
    this.listenResize();
    this.animate();
    this.initCursor();
    this.listenGlobalEvents();
  }

  initBackground() {
    this.bgContainer = new PIXI.Container;
    let graphics = new PIXI.Graphics;

    graphics.beginFill(16119285, 1);
    graphics.moveTo(0, 0);
    graphics.lineTo(0, 0);
    graphics.lineTo(this.appW, 0)
    graphics.lineTo(this.appW, this.appH);
    graphics.lineTo(0, this.appH)
    graphics.endFill()
    this.bgContainer.addChild(graphics)
    this.noiseFilterBg = new PIXI.filters.NoiseFilter;
    this.noiseFilterBg.noise = .05;
    this.bgContainer.filters = [this.noiseFilterBg];
    this.app.stage.addChild(this.bgContainer);
  }

  initRect(t = false) {
    this.rectContainer = new PIXI.Container, this.rect = new PIXI.Graphics;
    let e = this.appW / 2.24;
    this.rect.beginFill(0, 1);
    this.rect.moveTo(0, 0);
    this.rect.lineTo(0, 0);
    this.rect.lineTo(e, 0);
    this.rect.lineTo(e, this.appH);
    this.rect.lineTo(0, this.appH);
    this.rect.endFill();
    "index" !== this.routeName || t ? this.rectContainer.position.set(this.appW - e / 2, this.rect.height / 2) : this.rectContainer.position.set(this.appW + e / 2, this.rect.height / 2), this.rectContainer.pivot.set(e / 2, this.rect.height / 2), "index" === this.routeName ? this.rectContainer.scale.set(1, 1) : "projects-slug" === this.routeName || "allprojects" === this.routeName ? this.rectContainer.scale.set(4, 2) : "about" === this.routeName && (this.rectContainer.x = 1.3 * this.appW), this.rectContainer.addChild(this.rect), this.app.stage.addChild(this.rectContainer)
  }

  initProjectsImages(t = false) {
    console.log(this.imagesUrl);
    let e = this;
    this.maskContainer = new PIXI.Container, this.projectsContainer = new PIXI.Container;
    for (let i = 0; i < this.imagesUrl.length; i += 1) this.images[i] = new PIXI.Sprite(PIXI.loader.resources[this.imagesUrl[i]].texture), this.images[i].anchor.set(.5);
    this.projectsContainer.addChild(this.images[this.currentProjectIndex]);
    this.displacementSprite = PIXI.Sprite.fromImage("/assets/images/sprite.png");
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this.displacementSprite.scale.x = .5;
    this.displacementSprite.scale.y = .5;
    this.projectsContainer.addChild(this.displacementSprite);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.projectsContainer.filterArea = new PIXI.Rectangle(this.appW / 2, 0, this.appW / 2, this.appH);
    this.projectsContainer.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 10;
    this.displacementFilter.scale.y = 10;
    this.hoverDisplacementSprite = PIXI.Sprite.fromImage("/assets/images/displace.png");
    this.hoverDisplacementFilter = new PIXI.filters.DisplacementFilter(this.hoverDisplacementSprite);
    this.maskContainer.addChild(this.hoverDisplacementSprite);
    this.maskContainer.filters = [this.hoverDisplacementFilter];
    this.hoverDisplacementFilter.scale.x = -60;
    this.hoverDisplacementFilter.scale.y = -60;
    this.hoverDisplacementSprite.scale.x = 20;
    this.hoverDisplacementSprite.scale.y = 20;
    this.hoverDisplacementSprite.anchor.set(.5);
    this.hoverDisplacementSprite.position.set(0, 0);
    this.maskX = this.images[0].position.x - this.images[0].width / 2;
    this.maskY = this.images[0].position.y - this.images[0].height / 2;
    this.mask = new PIXI.Graphics, this.mask.beginFill(9160191, .4);
    this.mask.moveTo(this.maskX + this.padding, this.maskY + this.padding);
    this.mask.lineTo(this.maskX + this.padding, this.maskY + this.padding);
    this.mask.lineTo(this.maskX + this.images[0].width - this.padding, this.maskY + this.padding);
    this.mask.lineTo(this.maskX + this.images[0].width - this.padding, this.maskY + this.images[0].height - this.padding);
    this.mask.lineTo(this.maskX + this.padding, this.maskY + this.images[0].height - this.padding);
    this.mask.endFill();
    "index" !== this.routeName || t ? "index" === this.routeName && t ? this.maskContainer.x = this.appW - this.rectContainer.width / 2 : "projects-slug" === this.routeName ? (this.maskContainer.x = window.innerWidth / 2, this.projectsContainer.removeChild(this.images[this.currentProjectIndex]), this.projectsContainer.addChild(this.images[this.currentProjectIndex])) : "about" === this.routeName && (this.maskContainer.x = 1.3 * this.appW) : this.maskContainer.x = this.appW + this.rectContainer.width / 2, this.maskContainer.y = this.appH / 2, this.maskContainer.scale.x = .465, this.maskContainer.scale.y = .465, this.maskContainer.interactive = !0, "index" === this.routeName ? (this.maskContainer.buttonMode = !0, this.maskContainer.defaultCursor = "pointer") : (this.maskContainer.buttonMode = !1, this.maskContainer.defaultCursor = void 0), this.maskBgHome = new PIXI.Graphics, this.maskBgHome.beginFill("0xF5F5F5", 1), this.maskBgHome.moveTo(this.maskX + this.padding, this.maskY + this.padding), this.maskBgHome.lineTo(this.maskX + this.padding, this.maskY + this.padding), this.maskBgHome.lineTo(this.maskX + this.images[0].width - this.padding, this.maskY + this.padding), this.maskBgHome.lineTo(this.maskX + this.images[0].width - this.padding, this.maskY + this.images[0].height - this.padding), this.maskBgHome.lineTo(this.maskX + this.padding, this.maskY + this.images[0].height - this.padding), this.maskBgHome.endFill(), this.maskContainer.addChild(this.maskBgHome), this.updateProjectBgColor();
    let n = !1;

    this.maskContainer.on("mouseover", function () {
      TweenMax.to(e, .5, {
        displacementSpeed: 5,
        ease: Power2.ease
      });
      e.canvasService.triggerLinkHover('hover');
      n = true;
    });
    this.maskContainer.on("mousemove", function (t) {
      if (true === n) {
        let i = t.data.global;
        TweenMax.to(e.hoverDisplacementSprite, .5, {
          x: 2.2 * (i.x - e.maskContainer.x),
          y: 2.2 * (i.y - e.maskContainer.y),
          ease: Power2.ease
        })
      }
    });
    this.maskContainer.on("mouseout", function () {
      n = !1,
        TweenMax.to(e, 1.5, {
          displacementSpeed: 1
        });
      TweenMax.to(e.maskContainer.skew, .5, {
        x: 0,
        y: 0,
        ease: Power2.ease
      });
      TweenMax.to(e.hoverDisplacementSprite, .5, {
        x: 0,
        y: 0,
        ease: Power2.ease
      });
      e.canvasService.triggerLinkHover('out');
    });
    this.maskContainer.on("click", function () {
      e.canvasService.clickedOnImage(true);
    });
    this.maskContainer.mask = this.mask;
    this.maskContainer.addChild(this.mask);
    this.maskContainer.addChild(this.projectsContainer);
    this.app.stage.addChild(this.maskContainer);
    if ("allprojects" === this.routeName) {
      this.maskContainer.visible = !1;
      this.maskContainer.alpha = 0;
    }
  }

  updateProjectBgColor() {
    let projectColor = this.projectsArray[this.currentProjectIndex].color;
    let e = this.maskX - this.images[0].width;
    this.maskBgProject = new PIXI.Graphics;
    this.maskBgProject.beginFill(projectColor, 1);
    this.maskBgProject.moveTo(e + this.padding, this.maskY + this.padding);
    this.maskBgProject.lineTo(e + this.padding, this.maskY + this.padding);
    this.maskBgProject.lineTo(e + this.images[0].width - this.padding, this.maskY + this.padding);
    this.maskBgProject.lineTo(e + this.images[0].width - this.padding, this.maskY + this.images[0].height - this.padding);
    this.maskBgProject.lineTo(e + this.padding, this.maskY + this.images[0].height - this.padding);
    this.maskBgProject.endFill();
    this.maskContainer.addChild(this.maskBgProject);

    if ("projects-slug" === this.routeName) {
      let i = this.maskBgProject.x + this.images[0].width + 350;
      this.maskBgProject.scale.set(1.5);
      this.maskBgProject.x = i;
      this.projectsContainer.filterArea = new PIXI.Rectangle(0, 0, this.appW, this.appH);
    }
  }

  toggleMainCanvas(t) {
    if ("start" === t && "none" === this.app.renderer.view.style.display) {
      this.app.renderer.view.style.display = "block";
      this.app.start();
    }
    if ("stop" === t && "block" === this.app.renderer.view.style.display) {
      this.app.renderer.view.style.display = "none";
      this.app.stop();
    }
  }

  initAllProjects() {
    this.allProjectsContainer = new PIXI.Container;
    this.allProjectsContainer.x = this.appW / 2;

    if (0 === this.imagesAllProjects.length) {
      for (let t = 0; t < this.images.length; t += 1) {
        this.imagesAllProjects[t] = this.images[t];
      }
    }

    for (let e = 0; e < this.imagesAllProjects.length; e += 1) {
      this.imagesAllProjects[e].skew.x = 0;
      let i = this.projectsArray[e].color;
      let s = this.imagesAllProjects[e].width;
      let a = this.imagesAllProjects[e].height;
      let n = this.imagesAllProjects[e].x - s / 2;
      let r = this.imagesAllProjects[e].y - a / 2;
      let o = new PIXI.Graphics;
      o.beginFill(i, 1);
      o.moveTo(n, r);
      o.lineTo(n, r);
      o.lineTo(n + s, r);
      o.lineTo(n + s, r + a);
      o.lineTo(n, r + a);
      o.endFill();
      this.containersAllProjects[e] = new PIXI.Container;
      this.containersAllProjects[e].addChild(o);
      this.containersAllProjects[e].addChild(this.imagesAllProjects[e]);
      this.containersAllProjects[e].scale.x = .43;
      this.containersAllProjects[e].scale.y = .43;
      this.containersAllProjects[e].x = 500 * e;
      this.containersAllProjects[e].y = this.appH / 2;
      this.allProjectsContainer.addChild(this.containersAllProjects[e]);
    }
    this.app.stage.addChild(this.allProjectsContainer);
    if ("allprojects" !== this.routeName) {
      this.allProjectsContainer.visible = false;
      this.allProjectsContainer.alpha = 0;
    }
  }

  @HostListener('window:resize', ['$event'])
  listenResize(event?: any) {
    this.appW = window.innerWidth;
    this.appH = window.innerHeight;
    this.app.renderer.resize(this.appW, this.appH);
    this.updateCanvas(true);
  }

  updateCanvas(t = false) {
    this.app.stage.removeChild(this.cursorContainer);
    this.app.stage.removeChild(this.bgContainer);
    this.app.stage.removeChild(this.rectContainer);
    this.app.stage.removeChild(this.maskContainer);
    this.initBackground();
    this.initRect(t);
    this.initProjectsImages(t);
    this.initAllProjects();
    this.initCursor();
  }

  initCursor() {
    let t = this;
    this.cursorContainer = new PIXI.Container;
    this.cursorElm = new PIXI.Graphics;
    this.cursorElm.beginFill(13421772, 1);
    this.cursorElm.drawCircle(0, 0, 32);
    this.cursorElm.endFill();
    this.cursorElm.x = this.appW / 2;
    this.cursorElm.y = this.appH / 2;
    this.cursorElm.alpha = 0;
    this.cursorElm.scale.x = .3;
    this.cursorElm.scale.y = .3;
    this.cursorContainer.addChild(this.cursorElm);
    this.app.stage.addChild(this.cursorContainer);
    this.cursorPos = {
      x: this.appW / 2,
      y: this.appH / 2
    };
    window.addEventListener("mousemove", function (e) {
      1 !== t.cursorElm.alpha && TweenMax.to(t.cursorElm, .5, {
        alpha: .3,
        ease: Power2.ease
      }), t.cursorPos.x = e.clientX + 5, t.cursorPos.y = e.clientY + 5
    });
    window.addEventListener("wheel", function () {
      0 !== t.cursorElm.alpha && TweenMax.to(t.cursorElm, .5, {
        alpha: 0,
        ease: Power2.ease
      })
    });
    this.canvasService
      .triggerLinkHover$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((state) => {
        "hover" === state ? TweenMax.to(t.cursorElm.scale, .3, {
          x: 1,
          y: 1,
          ease: Power2.ease
        }) : "out" === state && TweenMax.to(t.cursorElm.scale, .3, {
          x: .3,
          y: .3,
          ease: Power2.ease
        })
      });
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.noiseFilterBg.seed = 1 * Math.random() * .05;
    this.displacementSprite.x += this.displacementSpeed;
    this.displacementSprite.y += this.displacementSpeed;
    TweenMax.to(this.cursorElm, .5, {
      x: this.cursorPos.x,
      y: this.cursorPos.y,
      ease: Power2.ease
    });
  }

  switchToHome() {
    let t = this;
    !1 === this.maskContainer.visible && (this.maskContainer.visible = !0, setTimeout(function () {
      TweenMax.to(t.maskContainer, .2, {
        alpha: 1,
        ease: Power2.ease
      })
    }, 1e3)), this.app.stage.removeChild(this.bgContainer), this.app.stage.removeChild(this.rectContainer), this.app.stage.removeChild(this.maskContainer), this.app.stage.removeChild(this.cursorContainer), this.app.stage.addChild(this.bgContainer), this.app.stage.addChild(this.rectContainer), this.app.stage.addChild(this.maskContainer), this.app.stage.addChild(this.cursorContainer), !0 === this.allProjectsContainer.visible && (TweenMax.to(this.allProjectsContainer, .2, {
      alpha: 0,
      ease: Power2.ease
    }), setTimeout(function () {
      t.allProjectsContainer.visible = !1, t.app.stage.removeChild(t.allProjectsContainer)
    }, 300));
    let e = this.maskBgProject.x - this.maskBgProject.x;
    TweenMax.to(this.maskBgProject.skew, .6, {
      x: .2,
      delay: .1,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskBgProject, .6, {
      x: e,
      delay: .1,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskBgProject.skew, .6, {
      x: 0,
      delay: .5,
      ease: Power3.easeInOut
    }), setTimeout(function () {
      t.maskBgProject.scale.set(1)
    }, 1500), TweenMax.to(this.rectContainer.skew, .5, {
      x: .2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.rectContainer.scale, .9, {
      x: 1,
      y: 1,
      ease: Power3.easeInOut
    }), TweenMax.to(this.rectContainer, .9, {
      x: this.appW - this.rect.width / 2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.rectContainer.skew, .5, {
      x: 0,
      delay: .25,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer.skew, .7, {
      x: .2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer, .9, {
      x: this.appW - this.rect.width / 2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer.skew, .7, {
      x: 0,
      delay: .3,
      ease: Power3.easeInOut
    }), this.maskContainer.buttonMode = !0, this.maskContainer.defaultCursor = "pointer", setTimeout(function () {
      t.projectsContainer.filterArea = new PIXI.Rectangle(t.appW / 2, 0, t.appW / 2, t.appH)
    }, 1e3);
  }

  switchToAbout() {
    var t = 1.3 * this.appW;
    TweenMax.to(this.rectContainer.skew, .8, {
      x: .3,
      ease: Power3.easeInOut
    }), TweenMax.to(this.rectContainer.scale, 1, {
      x: 1.2,
      y: 1.2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.rectContainer, 1.2, {
      x: t,
      ease: Power3.easeInOut
    }), TweenMax.to(this.rectContainer.skew, .8, {
      x: 0,
      delay: .3,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer.skew, .8, {
      x: .2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer, 1.2, {
      x: t,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer.skew, .8, {
      x: 0,
      delay: .3,
      ease: Power3.easeInOut
    })
  }

  switchToAllProjects() {
    let t = this;
    this.allProjectsContainer.visible = true;
    this.allProjectsContainer.x += 100;
    setTimeout(function () {
      TweenMax.to(t.allProjectsContainer, .4, {
        alpha: 1,
        x: t.allProjectsContainer.x - 100,
        ease: Power2.ease
      })
    }, 1e3);
    TweenMax.to(this.maskContainer, .4, {
      alpha: 0,
      ease: Power2.ease
    });
    setTimeout(function () {
      t.maskContainer.visible = false;
      t.app.stage.removeChild(t.maskContainer);
      t.app.stage.removeChild(t.bgContainer);
      t.app.stage.removeChild(t.rectContainer);
      t.app.stage.removeChild(t.cursorContainer);
      t.app.stage.addChild(t.rectContainer);
      t.app.stage.addChild(t.cursorContainer);
      t.app.stage.removeChild(t.allProjectsContainer);
      t.app.stage.addChild(t.allProjectsContainer);
    }, 500);
    this.projectsContainer.filterArea = new PIXI.Rectangle(0, 0, this.appW, this.appH);
    TweenMax.to(this.rectContainer.skew, .7, {
      x: .3,
      ease: Power3.easeInOut
    });
    TweenMax.to(this.rectContainer.scale, 1.2, {
      x: 4,
      y: 2,
      ease: Power3.easeInOut
    });
    TweenMax.to(this.rectContainer.skew, .7, {
      x: 0,
      delay: .3,
      ease: Power3.easeInOut
    });
  }

  switchToProject() {
    let t = this,
      e = this.maskBgProject.x + this.images[0].width + 350;
    this.maskBgProject.scale.set(1.5), TweenMax.to(this.maskBgProject.skew, .8, {
      x: .2,
      delay: .2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskBgProject, .8, {
      x: e,
      delay: .3,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskBgProject.skew, .8, {
      x: 0,
      delay: .5,
      ease: Power3.easeInOut
    }), this.projectsContainer.removeChild(this.images[this.currentProjectIndex]), this.projectsContainer.addChild(this.images[this.currentProjectIndex]), this.projectsContainer.filterArea = new PIXI.Rectangle(0, 0, this.appW, this.appH), TweenMax.to(this.rectContainer.skew, .7, {
      x: .2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.rectContainer.scale, 1.2, {
      x: 4,
      y: 2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.rectContainer.skew, .7, {
      x: 0,
      delay: .3,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer.skew, .8, {
      x: .2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer, 1.1, {
      x: this.appW / 2,
      ease: Power3.easeInOut
    }), TweenMax.to(this.maskContainer.skew, .6, {
      x: 0,
      delay: .3,
      ease: Power3.easeInOut
    }), this.maskContainer.buttonMode = !1, this.maskContainer.defaultCursor = void 0, setTimeout(function () {
      t.app.stage.removeChild(t.bgContainer)
    }, 500)
  }

  changeImage(t, e) {
    this.currentProjectIndex = e, this.images[t].alpha = 1, this.images[e].alpha = 0, this.projectsContainer.removeChild(this.images[t], this.images[e]), this.projectsContainer.addChild(this.images[e], this.images[t]), TweenMax.to(this, 1.5, {
      displacementSpeed: 10,
      ease: Power2.easeInOut
    }), TweenMax.to(this.displacementFilter.scale, 1, {
      x: 30,
      y: 30,
      ease: Power2.easeInOut
    }), TweenMax.to(this.projectsContainer.scale, 1, {
      x: 1.05,
      y: 1.05,
      ease: Power2.easeInOut
    }), TweenMax.to(this.images[t], 2, {
      alpha: 0,
      delay: .5,
      ease: Power2.easeInOut
    }), TweenMax.to(this.images[e], 2, {
      alpha: 1,
      delay: .5,
      ease: Power2.easeInOut
    }), TweenMax.to(this.projectsContainer.scale, 1.5, {
      x: 1,
      y: 1,
      delay: 1.25,
      ease: Power2.easeInOut
    }), TweenMax.to(this.displacementFilter.scale, 3, {
      x: 5,
      y: 5,
      delay: 1,
      ease: Power2.easeInOut
    }), TweenMax.to(this, 3, {
      displacementSpeed: 1,
      delay: 1,
      ease: Power2.easeInOut
    }), this.maskContainer.removeChild(this.maskBgProject), this.updateProjectBgColor(), this.maskContainer.removeChild(this.projectsContainer), this.maskContainer.addChild(this.projectsContainer)
  };

  moveAllProjects(t) {
    let e = this.appW / 2 - 500 * t;
    if (t !== this.lastAllProjectsIndex) {
      for (let i = 0; i < this.containersAllProjects.length; i += 1) this.lastAllProjectsIndex > t ? (TweenMax.to(this.containersAllProjects[i].skew, .2, {
        x: -.025,
        ease: Power3.easeInOut
      }), TweenMax.to(this.containersAllProjects[i].skew, .2, {
        x: 0,
        delay: .2,
        ease: Power3.easeInOut
      })) : (TweenMax.to(this.containersAllProjects[i].skew, .2, {
        x: .025,
        ease: Power3.easeInOut
      }), TweenMax.to(this.containersAllProjects[i].skew, .2, {
        x: 0,
        delay: .2,
        ease: Power3.easeInOut
      }));
      TweenMax.to(this.allProjectsContainer, .5, {
        x: e,
        ease: Power2.ease
      }), this.lastAllProjectsIndex = t
    }
  }

  selectAllProjects(t) {
    let e = this;
    this.changeImageWithoutAnimation(this.currentProjectIndex, t);
    this.canvasService.currentProjectIndex(t);
    this.maskBgProject.scale.set(1.5);
    this.maskBgProject.x = this.images[0].width + 350;
    this.maskContainer.x = this.appW / 2;
    TweenMax.to(this.allProjectsContainer, .5, {
      alpha: 0,
      ease: Power2.ease
    });
    setTimeout(function () {
      e.allProjectsContainer.visible = !1;
      e.app.stage.removeChild(e.allProjectsContainer);
    }, 500);
    this.maskContainer.visible = !0;
    this.app.stage.addChild(this.maskContainer);
    TweenMax.to(this.maskContainer, .2, {
      alpha: 1,
      ease: Power2.ease
    });
    this.maskContainer.buttonMode = !1;
    this.maskContainer.defaultCursor = void 0;
  }

  changeImageWithoutAnimation(t, e) {
    this.app.start();
    this.currentProjectIndex = e;
    this.canvasService.currentProjectIndex(e);
    this.maskContainer.removeChild(this.maskBgProject);
    this.updateProjectBgColor();
    this.projectsContainer.removeChild(this.images[t], this.images[e]);
    this.projectsContainer.addChild(this.images[e]);
    this.maskContainer.removeChild(this.projectsContainer);
    this.maskContainer.addChild(this.projectsContainer);
  }

  listenGlobalEvents() {
    let q = this;
    this.canvasService
      .switchToHome$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e != null && e) {
          q.switchToHome();
          this.canvasService.switchToHome(false);
        }
      });

    this.canvasService
      .switchToAbout$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e != null && e) {
          q.switchToAbout();
          this.canvasService.switchToAbout(false);
        }
      });

    this.canvasService
      .switchToProject$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e != null && e) {
          q.switchToProject();
          this.canvasService.switchToProject(false);
        }
      });

    this.canvasService
      .switchToAllProjects$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e != null && e) {
          q.switchToAllProjects();
          this.canvasService.switchToAllProjects(false);
        }
      });

    this.canvasService
      .updateCanvas$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e != null && e) {
          q.updateCanvas();
          this.canvasService.updateCanvas(false);
        }
      });

    this.canvasService
      .changeProject$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e.currentProjectIndex != null && e.nextProjectIndex != null) {
          q.changeImage(e.currentProjectIndex, e.nextProjectIndex);
        }
      });

    this.canvasService
      .changeProjectWithoutAnimation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e.currentProjectIndex != null && e.nextProjectIndex != null) {
          q.changeImageWithoutAnimation(e.currentProjectIndex, e.nextProjectIndex);
        }
      });

    this.canvasService
      .toggleMainCanvas$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((state) => {
        if (state != null) {
          q.toggleMainCanvas(state);
        }
      });

    this.canvasService
      .allProjectHover$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((index) => {
        if (index != null) {
          q.moveAllProjects(index);
        }
      });

    this.canvasService
      .allProjectClick$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((index) => {
        if (index != null) {
          q.selectAllProjects(index);
        }
      });
  }
}
