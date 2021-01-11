import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { Power2 } from 'gsap/all';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PROJECTS } from 'src/app/data/projects';
import { CanvasService } from 'src/app/canvas/canvas.service';

declare var PIXI: any;
declare var TweenMax: any;

@Component({
  selector: 'app-next-project',
  templateUrl: './next-project.component.html',
  styleUrls: ['./next-project.component.scss']
})
export class NextProjectComponent implements OnInit {
  @Input() currentProject$: any;

  projects: any = PROJECTS;

  currentProject: any = "";
  app: any = "";
  appW: number = 0;
  appH: number = 0;
  projectsArray: any = [];
  nextProject: any = "";
  imageUrl: any = "";
  color: any = "";
  backgroundContainer: any = "";
  background: any = "";
  imageContainer: any = "";
  image: any = "";
  widthToReach: number = 362;
  heightToReach: number = 552;
  mask: any = "";
  padding: number = 25;
  displacementSprite: any = "";
  displacementFilter: any = "";
  displacementSpeed: number = 1;
  cursorContainer: any = "";
  cursorElm: any = {};
  cursorPos: any = {};
  nextProjectCanvas: any = "";

  private _unsubscribeAll: Subject<any> = new Subject();

  @ViewChild('cursorTextRef') cursorTextRef$: ElementRef;

  constructor(
    private canvasService: CanvasService
  ) { }

  ngOnInit() {
    var t = this;
    this.currentProject$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((project: any) => {
        if (project != null) {
          this.currentProject = project;

          this.nextProjectCanvas = document.querySelector(".NextProject__Canvas");
          this.convertProjectsToArray();
          this.getNextProject();
          this.imageUrl = this.nextProject.images.main;
          this.initCanvas();
          this.listenResize();
        }
      });

    this.canvasService
      .toggleNextProjectCanvas$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e != null) {
          t.toggleNextProjectCanvas(e);
        }
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  initCanvas() {
    let t = "WebGL";
    PIXI.utils.isWebGLSupported() || (t = "canvas");
    PIXI.utils.sayHello(t);
    this.appW = window.innerWidth;
    this.appH = window.innerHeight - .15 * window.innerHeight;
    this.app = new PIXI.Application({
      antialias: !0,
      transparent: !0,
      resolution: 1
    });
    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = !0;
    this.app.renderer.resize(this.appW, this.appH);
    this.nextProjectCanvas.appendChild(this.app.view);
    this.setup();
  }

  setup() {
    this.initNextProjectBackground();
    this.initNextProjectImage();
    this.initMask();
    this.animate();
    this.initCursor();
    this.listenMouseEvents();
  }

  initNextProjectBackground() {
    this.backgroundContainer = new PIXI.Container;
    this.background = new PIXI.Graphics;
    this.background.beginFill(this.nextProject.color, 1);
    this.background.moveTo(0, 0);
    this.background.lineTo(0, 0);
    this.background.lineTo(this.appW, 0);
    this.background.lineTo(this.appW, this.appH);
    this.background.lineTo(0, this.appH);
    this.background.endFill();
    this.background.pivot.set(this.backgroundContainer.width / 2, this.backgroundContainer.height / 2);
    this.background.position.set(this.backgroundContainer.width / 2, this.backgroundContainer.height / 2);
    this.backgroundContainer.addChild(this.background);
    this.app.stage.addChild(this.backgroundContainer);
  }

  initNextProjectImage() {
    this.imageContainer = new PIXI.Container;
    this.image = new PIXI.Sprite(PIXI.loader.resources[this.imageUrl].texture);
    this.image.anchor.set(.5);
    this.imageContainer.scale.x = .45;
    this.imageContainer.scale.y = .45;
    this.imageContainer.position.x = this.appW / 2;
    this.imageContainer.position.y = .45 * this.image.height / 2;
    this.imageContainer.addChild(this.image);
    this.app.stage.addChild(this.imageContainer);
  }

  initMask() {
    let t = this.image.x - this.image.width / 2,
      e = t + this.image.width,
      i = this.image.y - this.image.height / 2,
      n = i + this.image.height;
    this.mask = new PIXI.Graphics;
    this.mask.beginFill(9160191, .4);
    this.mask.moveTo(t + this.padding, i + this.padding);
    this.mask.lineTo(t + this.padding, i + this.padding);
    this.mask.lineTo(e - this.padding, i + this.padding);
    this.mask.lineTo(e - this.padding, n - this.padding);
    this.mask.lineTo(t + this.padding, n - this.padding);
    this.mask.endFill();
    this.imageContainer.mask = this.mask;
    this.imageContainer.addChild(this.mask);
  }

  listenMouseEvents() {
    let t = this;
    this.nextProjectCanvas.addEventListener("mouseenter", function () {
      TweenMax.to(t.imageContainer.scale, .5, {
        x: .47,
        y: .47,
        ease: Power2.ease
      });
      TweenMax.to(t.cursorTextRef$.nativeElement, .5, {
        opacity: 1,
        ease: Power2.ease
      });
      TweenMax.to(t.cursorElm, .5, {
        alpha: .3,
        ease: Power2.ease
      });
    });
    this.nextProjectCanvas.addEventListener("mouseout", function () {
      TweenMax.to(t.imageContainer.scale, .5, {
        x: .45,
        y: .45,
        ease: Power2.ease
      });
      TweenMax.to(t.cursorTextRef$.nativeElement, .5, {
        opacity: 0,
        ease: Power2.ease
      });
      TweenMax.to(t.cursorElm, .5, {
        alpha: 0,
        ease: Power2.ease
      });
    });
  }

  setCanvasToNextProject() {
    TweenMax.to(this.imageContainer.scale, .2, {
      x: .45,
      y: .45,
      ease: Power2.easeOut
    });
    this.appH = window.innerHeight;
    TweenMax.to(this.imageContainer, .2, {
      y: this.appH / 2,
      ease: Power2.ease
    });
    TweenMax.to(this.background, .5, {
      width: this.widthToReach,
      height: this.heightToReach,
      x: this.appW / 2 - this.widthToReach / 2,
      y: this.appH / 2 - this.heightToReach / 2,
      ease: Power2.ease
    });
  }

  toggleNextProjectCanvas(t) {
    "start" === t && "none" === this.app.renderer.view.style.display ? (this.app.renderer.view.style.display = "block", this.app.start(), this.updateCanvas()) : "stop" === t && "block" === this.app.renderer.view.style.display && (this.app.renderer.view.style.display = "none", this.app.stop())
  }

  convertProjectsToArray() {
    for (var t in this.projects) {
      if (this.projects.hasOwnProperty(t)) {
        var e = this.projects[t];
        this.projectsArray.push(e);
      }
    }
  }

  getNextProject() {
    this.currentProject.id + 1 >= this.projectsArray.length ? this.nextProject = this.projectsArray[0] : this.nextProject = this.projectsArray[this.currentProject.id + 1];
  }

  clickOnNextProject() {
    this.canvasService.changeProjectWithoutAnimation(
      this.currentProject.id,
      this.nextProject.id
    );
    this.setCanvasToNextProject();
    this.canvasService.clickOnNextProject(true);
  }

  initCursor() {
    var t = this;
    this.cursorContainer = new PIXI.Container;
    this.cursorElm = new PIXI.Graphics;
    this.cursorElm.beginFill(0, .4);
    this.cursorElm.drawCircle(0, 0, 16);
    this.cursorElm.endFill();
    this.cursorElm.x = this.appW / 2;
    this.cursorElm.y = this.appH / 2;
    this.cursorElm.alpha = 0;
    this.cursorContainer.addChild(this.cursorElm);
    this.app.stage.addChild(this.cursorContainer);
    this.cursorPos = {
      x: this.appW / 2,
      y: this.appH / 2
    };
    let e = this.nextProjectCanvas.querySelector("canvas");
    e.addEventListener("mousemove", function (i) {
      1 !== t.cursorElm.alpha && (TweenMax.to(t.cursorElm, .5, {
        alpha: .3,
        ease: Power2.ease
      }), TweenMax.to(t.cursorTextRef$.nativeElement, .5, {
        opacity: 1,
        ease: Power2.ease
      }));
      var a = e.getBoundingClientRect().top;
      t.cursorPos.x = i.clientX + 2, t.cursorPos.y = i.clientY - a + 5
    });
    window.addEventListener("wheel", function () {
      0 !== t.cursorElm.alpha && (TweenMax.to(t.cursorElm, .5, {
        alpha: 0,
        ease: Power2.ease
      }), t.cursorTextRef$.nativeElement && TweenMax.to(t.cursorTextRef$.nativeElement, .5, {
        opacity: 0,
        ease: Power2.ease
      }))
    });
  }

  updateCanvas() {
    this.app.stage.removeChild(this.backgroundContainer);
    this.app.stage.removeChild(this.imageContainer);
    this.initNextProjectBackground();
    this.initNextProjectImage();
    this.initMask();
    this.initCursor();
  }

  listenResize() {
    var t = this;
    window.addEventListener("resize", function () {
      t.appW = window.innerWidth;
      t.appH = window.innerHeight;
      t.app.renderer.resize(t.appW, t.appH);
      t.updateCanvas();
    });
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this.cursorPos.x) {
      TweenMax.to(this.cursorElm, .3, {
        x: this.cursorPos.x,
        y: this.cursorPos.y,
        ease: Power2.ease
      });
      TweenMax.to(this.cursorTextRef$.nativeElement, .3, {
        left: this.cursorPos.x - 56,
        top: this.cursorPos.y - 56,
        ease: Power2.ease
      });
    }
  }
}
