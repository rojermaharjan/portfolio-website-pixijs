import { Component, OnInit, OnDestroy } from '@angular/core';
import { CanvasService } from '../canvas/canvas.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit, OnDestroy {

  routeName: string;
  clickedOnProject: boolean = !1;
  currentProjectIndex: number;

  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private canvasService: CanvasService,
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map((data) => {
        return data.name ? data.name : 'index';
      })
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((name) => this.routeName = name);

    this.canvasService
      .currentProjectIndex$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((index) => {
        if (index != null) {
          this.currentProjectIndex = index;
        }
      });

    let t = this;
    setTimeout(function () {
      t.canvasService.switchToAllProjects(true);
    }, 300);

    this.listenHover();
  }

  listenHover() {
    for (
      let e = this,
      t = document.querySelectorAll(".AllProjects__Title"),
      i = function (i) {
        t[i].addEventListener("mouseenter", function () {
          t[i].classList.add("hover");
          e.canvasService.allProjectHover(i);
        });
        t[i].addEventListener("mouseout", function () {
          t[i].classList.remove("hover");
        });
        t[i].addEventListener("click", function () {
          e.clickedOnProject = !0;
          e.canvasService.allProjectClick(i);
          // document.querySelector(".AllProjects__Content").classList.add("hidden");
          // document.querySelector(".AllProjects__Overlay").classList.add("hidden");
        });
      },
      s = 0;
      s < t.length;
      s += 1
    )i(s)
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
