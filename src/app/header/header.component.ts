import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CanvasService } from '../canvas/canvas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  siteInfo: any = environment.siteInfo;
  isAppeared: boolean = false;

  @ViewChild('headerRef') container$: ElementRef;

  constructor(
    private canvasService: CanvasService
  ) { }

  ngOnInit() {
    this.listenGlobalEvents();
    this.canvasService.loadingEnded$.subscribe((e) => {
      if (e === true) {
        setTimeout(() => {
          this.isAppeared = true;
        }, 300);
      }
    });
  }

  listenGlobalEvents() {
    var t = this;
    this.canvasService.switchToHome$.subscribe((e) => {
      this.container$.nativeElement.classList.remove("project");
      this.container$.nativeElement.classList.remove("about");
      this.container$.nativeElement.classList.remove("allprojects");
      this.container$.nativeElement.classList.add("home");
    });
    this.canvasService.switchToAllProjects$.subscribe((e) => {
      this.container$.nativeElement.classList.remove("home");
      this.container$.nativeElement.classList.remove("project");
      this.container$.nativeElement.classList.remove("about");
      this.container$.nativeElement.classList.add("allprojects");
    });
    this.canvasService.switchToProject$.subscribe((e) => {
      this.container$.nativeElement.classList.remove("home");
      this.container$.nativeElement.classList.remove("about");
      this.container$.nativeElement.classList.remove("allprojects");
      this.container$.nativeElement.classList.add("project");
    });
    this.canvasService.switchToAbout$.subscribe((e) => {
      this.container$.nativeElement.classList.remove("home");
      this.container$.nativeElement.classList.remove("project");
      this.container$.nativeElement.classList.remove("allprojects");
      this.container$.nativeElement.classList.add("about");
    });
    this.canvasService.allProjectClick$.subscribe((e) => {
      this.container$.nativeElement.classList.remove("home"),
      this.container$.nativeElement.classList.remove("about"),
      this.container$.nativeElement.classList.remove("allprojects"),
      this.container$.nativeElement.classList.add("project")
    });
  }
}
