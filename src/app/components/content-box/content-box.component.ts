import { Component, Input,  OnInit } from '@angular/core';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss']
})
export class ContentBoxComponent implements OnInit {

  // Button labels - there has to be a better way to do this lol
  pomodoroLabel = "Pomodoro";
  shortBreakLabel = "Short break";
  longBreakLabel = "Long break";

  @Input() time = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
