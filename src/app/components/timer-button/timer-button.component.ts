import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.scss']
})
export class TimerButtonComponent implements OnInit {

  @Input() label = "default string";

  constructor() {  }

  ngOnInit(): void {

  }

}
