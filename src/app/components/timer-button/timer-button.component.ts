import { Component, Input, OnInit } from '@angular/core';
import { TimerStateService, TimerType } from 'src/app/services/timer-state.service';

@Component({
  selector: 'app-timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.scss']
})

export class TimerButtonComponent implements OnInit {

  @Input() label = "default string";

  constructor(private timer: TimerStateService) { }
  ngOnInit(): void {  }
}