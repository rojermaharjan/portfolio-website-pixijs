import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CanvasService } from '../canvas/canvas.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() projects: any;

  currentProjectIndex: number;
  projectsArray: any = [];
  projectNumber: string = "";
  projectTitle: string = "";
  projectDesc: string = "";
  projectSlug: string = "";

  private _unsubscribeAll: Subject<any> = new Subject();

  @ViewChild('containerRef') containerRef$: ElementRef;
  @ViewChild('buttonRef') buttonRef$: ElementRef;

  constructor(
    private canvasService: CanvasService
  ) { }

  ngOnInit() {
    this.convertProjectsToArray();
    this.listenGlobalEvents();
    this.canvasService
      .currentProjectIndex$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((index) => {
        if (index != null) {
          this.currentProjectIndex = index;
          this.changeText(this.currentProjectIndex);
        }
      });
    this.projectNumber = this.projectsArray[0].number;
    this.projectTitle = this.projectsArray[0].title;
    this.projectDesc = this.projectsArray[0].desc;
    this.projectSlug = this.projectsArray[0].slug;
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  convertProjectsToArray() {
    for (let e in this.projects) if (this.projects.hasOwnProperty(e)) {
      let t = this.projects[e];
      this.projectsArray.push(t);
    }
  }

  listenGlobalEvents() {
    let e = this;
    e.canvasService
      .changeProject$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((t) => {
        if (t.nextProjectIndex != null) {
          e.changeText(t.nextProjectIndex);
        }
      });
  }

  changeText(e) {
    let t = this;
    this.containerRef$.nativeElement.classList.remove("fade-in");
    this.buttonRef$.nativeElement.classList.add("fade-out");
    setTimeout(function () {
      t.projectNumber = t.projectsArray[e].number;
      t.projectTitle = t.projectsArray[e].title;
      t.projectDesc = t.projectsArray[e].desc;
      t.projectSlug = t.projectsArray[e].slug;
      t.containerRef$.nativeElement.classList.add("fade-in");
      t.buttonRef$.nativeElement.classList.remove("fade-out");
    }, 1e3);
  }
}
