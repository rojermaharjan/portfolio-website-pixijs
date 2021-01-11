import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PROJECTS } from '../data/projects';
import { CanvasService } from '../canvas/canvas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  projects: any = PROJECTS;

  projectsArray: any = [];
  currentProjectIndex: number;
  scrolling: boolean = false;
  isPageLeaving: boolean = false;
  isPageEntering: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private canvasService: CanvasService,
    private router: Router
  ) { }

  ngOnInit() {
    var e = this;
    this.canvasService
      .currentProjectIndex$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((index) => {
        if (index != null) {
          this.currentProjectIndex = index;
        }
      });
    this.convertProjectsToArray();
    this.initEvents();
    setTimeout(function () {
      e.canvasService.switchToHome(true);
    }, 300);
    setTimeout(function () {
      e.listenGlobalEvents()
    }, 1000);
  }

  ngOnDestroy() {
    document.removeEventListener("wheel", this.wheelEvent);
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  convertProjectsToArray() {
    for (var e in this.projects) if (this.projects.hasOwnProperty(e)) {
      var t = this.projects[e];
      this.projectsArray.push(t)
    }
  }

  initEvents() {
    document.addEventListener("wheel", this.wheelEvent);
  }

  wheelEvent = (e) => {
    var t = this;
    if (false === t.scrolling) {
      t.scrolling = true;
      let o = t.projectsArray.length;
      let s = void 0;

      e.deltaY > 0 && t.currentProjectIndex < o - 1 ? s = t.currentProjectIndex + 1 : e.deltaY < 0 && t.currentProjectIndex > 0 ? s = t.currentProjectIndex - 1 : t.currentProjectIndex >= o - 1 ? s = 0 : t.currentProjectIndex <= 0 && (s = o - 1), void 0 != s && t.canvasService.changeProject(t.currentProjectIndex, s), t.currentProjectIndex = s, setTimeout(function () {
        t.scrolling = !1
      }
        , 3e3)
    }
  }

  listenGlobalEvents() {
    var e = this;
    this.canvasService
      .clickedOnImage$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((t) => {
        if (t !=null && t) {
          e.routeToProject();
          this.canvasService.clickedOnImage(false);
        }
      });
  }

  routeToProject() {
    this.router.navigate(["/projects/" + this.projectsArray[this.currentProjectIndex].slug]);
  }
}
