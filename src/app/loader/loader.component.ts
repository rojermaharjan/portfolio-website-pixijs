import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../canvas/canvas.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  progress: number = 0;
  nextStep: number = 0;

  fadeOut: boolean = false;

  constructor(
    private canvasService: CanvasService
  ) { }

  ngOnInit() {
    let q = this;
    this.canvasService.loadingProgress$.subscribe((progress) => {
      this.nextStep = progress;
      let i = setInterval(function () {
        if (q.progress < q.nextStep) {
          q.progress += 1;
        }
        if (100 === q.progress) {
          q.canvasService.loadingEnded(true);
          setTimeout(function () {
            q.fadeOut = true;
          }, 300);
          clearInterval(i);
        }
      }, 100);
    });
  }

}
