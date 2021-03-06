import { Component, OnInit } from '@angular/core';
import { TimerStateService, TimerType } from 'src/app/services/timer-state.service';

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

  bigButtonClass = 'btn-start';
  startButtonLabel = 'Start';

  constructor(public timer: TimerStateService) { }
  ngOnInit(): void {
  }
  // maybe this can be done in one function but ill do it with three for now (has to be hardcoded somewhere i guess)
  onClickPomodoro() {
    if(this.timer.isTimerRunning) {
      alert("You cant swap the displayed timer while a the timer is running. Please pause before.");
    } else {
      this.timer.resetTimer();
      this.timer.currentType = TimerType.pomodoro;
      this.timer.currentTimeMs = this.timer.durationMsPomodoro;
    }    
  }
  onClickShort() {
    if(this.timer.isTimerRunning) {
      alert("You cant swap the displayed timer while a the timer is running. Please pause before.");
    } else {   
      this.timer.resetTimer();
      this.timer.currentType = TimerType.short;
      this.timer.currentTimeMs = this.timer.durationMsShort;
    }
  }
  onClickLong() {
    if(this.timer.isTimerRunning) {
      alert("You cant swap the displayed timer while a the timer is running. Please pause before.");
    } else {   
      this.timer.resetTimer();
      this.timer.currentType = TimerType.long;
      this.timer.currentTimeMs = this.timer.durationMsLong;
    }
  }
  onClickStartButton() {
    this.timer.interactStartButton();
    this.timer.isTimerRunning ? this.bigButtonClass = "btn-stop" : this.bigButtonClass ="btn-start";
    this.timer.isTimerRunning ? this.startButtonLabel = "Stop" : this.startButtonLabel ="Start";
  }
}
