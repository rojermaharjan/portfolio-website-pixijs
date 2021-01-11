import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Power2 } from 'gsap/all';
import Scrollbar from 'smooth-scrollbar';

import { CanvasService } from '../canvas/canvas.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PROJECTS } from '../data/projects';

declare var TweenMax: any;

@Component({
  selector: 'app-projects-slug',
  templateUrl: './projects-slug.component.html',
  styleUrls: ['./projects-slug.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsSlugComponent implements OnInit, OnDestroy {
  projects: any = PROJECTS;

  scrollbar: any = "";
  project: any;
  project$ = new BehaviorSubject<any>(null);
  clickOnNextProjectCalled: boolean = false;
  splitContainers: any = "";

  private _unsubscribeAll: Subject<any> = new Subject();

  @ViewChild('title') titleRef$: ElementRef;

  constructor(
    private canvasService: CanvasService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let t = this;
    setTimeout(function () {
      t.canvasService.switchToProject(true);
      t.canvasService.updateCanvas(true);
    }, 300);
    this.route
      .params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
        if (params.slug) {
          this.project = this.projects[params.slug];
          this.project$.next(this.project);
          this.canvasService.currentProjectIndex(this.project.id);
          this.scrollbar = Scrollbar.init(document.querySelector(".ScrollContainer"), {
            damping: .15
          });
          this.splitByLetters();
          this.hideOnScroll();
          this.scrollbar.scrollTop = 0;
          this.runParallax();
          this.runScrollParallax();
        }
      });

    this.canvasService
      .clickOnNextProject$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((e) => {
        if (e != null && e) {
          t.clickOnNextProject();
          this.canvasService.clickOnNextProject(false);
        }
      });
  }

  ngOnDestroy() {
    Scrollbar.destroyAll();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  splitByLetters() {
    let e = this.project.title.split("");
    let titleEl$ = this.titleRef$.nativeElement;
    titleEl$.innerText = "";
    for (var i = 0; i < e.length; i++) " " === e[i] ? titleEl$.innerHTML = titleEl$.innerHTML + '<span class="letter space">' + e[i] + "</span>" : titleEl$.innerHTML = titleEl$.innerHTML + '<span class="letter">' + e[i] + "</span>";
  }

  hideOnScroll = () => {
    requestAnimationFrame(this.hideOnScroll);
    let t = document.querySelectorAll(".js-hideOnScroll");

    for (let i = 0; i < t.length; i++) {
      let o = t[i];
      this.scrollbar.scrollTop > 100 ? o.classList.add("hidden") : o.classList.remove("hidden");
    }
  }

  runParallax = () => {
    requestAnimationFrame(this.runParallax);
    let t = this.titleRef$;
    if (t) {
      let e = 1 * Math.abs(this.scrollbar.scrollTop);
      let i = .2 * Math.abs(this.scrollbar.scrollTop);
      t.nativeElement.style.transform = "translate3d(" + -e + "px," + i + "px, 0)";
    }
  }

  runScrollParallax = () => {
    requestAnimationFrame(this.runScrollParallax);
    let t = document.querySelectorAll('[data-parallax="true"]');

    for (let i = 0; i < t.length; i++) {
      let o = t[i] as HTMLElement;
      let l = "";
      let h = Math.abs(this.scrollbar.scrollTop) * parseFloat(o.getAttribute("data-speed"));
      l = "up" === o.getAttribute("data-direction") ? "-" : "";
      o.style.transform = "translate3d(0, " + l + h + "px, 0)";
    }
    this.toggleCanvas();
  }

  clickOnNextProject() {
    var t = this;
    setTimeout(function () {
      if (t.scrollbar.scrollTop > 300 && false === t.clickOnNextProjectCalled) {
        console.log("scroll to bottom");
        t.clickOnNextProjectCalled = true;
        TweenMax.to(t.scrollbar, .5, {
          scrollTop: t.scrollbar.limit.y,
          ease: Power2.ease
        });
      }
    }, 1);
  }

  toggleCanvas() {
    if (this.scrollbar.scrollTop > window.innerHeight) {
      this.canvasService.toggleMainCanvas("stop");
    } else {
      this.canvasService.toggleMainCanvas("start");
    }

    if (this.scrollbar.scrollTop < this.scrollbar.limit.y - window.innerHeight) {
      this.canvasService.toggleNextProjectCanvas("stop");
    } else {
      this.canvasService.toggleNextProjectCanvas("start");
    }
  }
}
