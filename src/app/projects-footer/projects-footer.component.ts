import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CanvasService } from '../canvas/canvas.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-projects-footer',
  templateUrl: './projects-footer.component.html',
  styleUrls: ['./projects-footer.component.scss']
})
export class ProjectsFooterComponent implements OnInit {
  @Input() projects: any;

  currentProjectIndex: number;
  maxProjectIndex: number = 0;
  progress: number = 0;
  projectsArray: any = [];
  appeared: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject();

  @ViewChild('progressBarSlide') progressBarSlide$: ElementRef;

  constructor(
    private canvasService: CanvasService
  ) { }

  ngOnInit() {
    var e = this;
    this.convertProjectsToArray();
    this.maxProjectIndex = this.projectsArray.length;
    this.canvasService
      .currentProjectIndex$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((index) => {
        this.currentProjectIndex = index;
        this.updateIndexAndProgressBar(this.currentProjectIndex);
      });
    this.listenGlobalEvents();

    setTimeout(function () {
      e.appeared = true;
    }, 1500);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  convertProjectsToArray() {
    for (var e in this.projects) if (this.projects.hasOwnProperty(e)) {
      var t = this.projects[e];
      this.projectsArray.push(t)
    }
  }

  updateIndexAndProgressBar(e) {
    this.currentProjectIndex = e + 1;
    this.progress = 100 / this.maxProjectIndex * this.currentProjectIndex;
    this.progressBarSlide$.nativeElement.style.transform = "translateX(" + -1 * (100 - this.progress) + "%)";
  }

  listenGlobalEvents() {
    var e = this;
    this.canvasService
      .changeProject$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((t) => {
        if (t.currentProjectIndex != t.nextProjectIndex) {
          e.updateIndexAndProgressBar(t.nextProjectIndex);
        }
      });
  }
}
