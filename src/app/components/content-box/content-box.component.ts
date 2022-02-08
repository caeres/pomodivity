import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss']
})
export class ContentBoxComponent implements OnInit {
  // Button labels - there has to be a better way to do this lol
  pomodoroLabel = "POMODORO";
  shortBreakLabel = "SHORT BREAK";
  longBreakLabel = "LONG BREAK";

  constructor() { }

  ngOnInit(): void {
  }

}
