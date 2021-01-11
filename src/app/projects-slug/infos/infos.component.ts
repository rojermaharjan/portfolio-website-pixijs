import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfosComponent implements OnInit {
  @Input() layout: any;

  containers: any = "";
  appeared: boolean = false;

  constructor() { }

  ngOnInit() {
    this.splitByLetters();
  }

  splitByLetters() {
    this.containers = document.querySelectorAll("span.js-toSplit");
    for (var t = 0; t < this.containers.length; t += 1) {
      var e = this.containers[t].getAttribute("data-text").split("");
      this.containers[t].innerText = "";
      for (var i = 0; i < e.length; i += 1) " " === e[i] ? this.containers[t].innerHTML = this.containers[t].innerHTML + '<span class="letter space">' + e[i] + "</span>" : this.containers[t].innerHTML = this.containers[t].innerHTML + '<span class="letter">' + e[i] + "</span>"
    }
  }

  onIntersection({ visible }: { target: Element; visible: boolean }): void {
    this.appeared = visible ? true : false;
  }
}
