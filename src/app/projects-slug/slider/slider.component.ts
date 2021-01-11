import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

declare var TweenMax: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() layout: any;

  isDragging: boolean = !1;
  currentPos: number = 0;
  nextPos: number = 0;
  lastPosMobile: number = 0;

  @ViewChild('containerRef') containerRef$: ElementRef;
  @ViewChild('trackRef') trackRef$: ElementRef;

  constructor() { }

  ngOnInit() {
    this.initDrag();
    this.animate();
  }

  initDrag() {
    this.containerRef$.nativeElement.addEventListener("mousedown", this.startDrag);
    this.containerRef$.nativeElement.addEventListener("touchstart", this.startDrag);
    window.addEventListener("mouseup", this.stopDrag);
    window.addEventListener("touchend", this.stopDrag);
    this.containerRef$.nativeElement.addEventListener("mouseup", this.stopDrag);
    this.containerRef$.nativeElement.addEventListener("touchend", this.stopDrag);
    this.trackRef$.nativeElement.addEventListener("mouseup", this.stopDrag);
    this.trackRef$.nativeElement.addEventListener("touchend", this.stopDrag);
    window.addEventListener("mousemove", this.drag);
    window.addEventListener("touchmove", this.drag);
  }

  startDrag = (t) => {
    !1 === this.isDragging && (this.isDragging = !0, t.touches && (this.lastPosMobile = t.touches[0].pageX))
  }

  drag = (t) => {
    !0 === this.isDragging && (this.nextPos = 2 * t.movementX, void 0 === t.movementX && (this.nextPos = 2 * -(this.lastPosMobile - t.touches[0].pageX), this.lastPosMobile = t.touches[0].pageX), this.currentPos + this.nextPos < 1 && (this.currentPos += this.nextPos))
  }

  stopDrag = () => {
    !0 === this.isDragging && (Math.abs(this.currentPos) + this.nextPos > this.trackRef$.nativeElement.offsetWidth - window.innerWidth / 3 * 2 && (this.currentPos = -(this.trackRef$.nativeElement.offsetWidth - window.innerWidth / 3 * 2)), this.isDragging = !1)
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    TweenMax.to(this.trackRef$.nativeElement, .5, {
      x: this.currentPos
    });
  }
}
