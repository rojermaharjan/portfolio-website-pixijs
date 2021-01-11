import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {
  @Input() layout: any;

  constructor() { }

  ngOnInit() {
  }

}
