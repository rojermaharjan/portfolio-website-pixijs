import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { CanvasService } from './canvas/canvas.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CanvasService]
})
export class AppComponent implements OnInit {
  title = 'yodea';
  
  showLoader: boolean = true;
  routeName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private canvasService: CanvasService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map((data) => {
        return data.name ? data.name : 'index';
      })
    )
      .subscribe((name) => this.routeName = name);
  }

  ngOnInit() {
    this.listenLoadingEnd();
  }

  listenLoadingEnd() {
    let q = this;
    this.canvasService
      .loadingEnded$
      .subscribe((e) => {
        if (e === true) {
          setTimeout(function () {
            q.showLoader = false;
            if ("index" === q.routeName) {
              (q.canvasService.updateCanvas(true), q.canvasService.switchToHome(true));
            }
            if ("allprojects" === q.routeName) {
              (q.canvasService.switchToAllProjects(true), q.canvasService.updateCanvas(true));
            }
            if ("projects-slug" === q.routeName) {
              (q.canvasService.switchToProject(true), q.canvasService.updateCanvas(true));
            }
            if ("about" === q.routeName) {
              (q.canvasService.switchToAbout(true), q.canvasService.updateCanvas(true));
            }
          }, 1000);
        }
      });
  }
}
