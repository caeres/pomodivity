import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import Timer from 'tiny-timer';
import { ContentBoxComponent } from '../components/content-box/content-box.component';

@Injectable({
  providedIn: 'root'
})

export class TimerStateService{

  public isTimerRunning = false;
  // iffy
  public isTimerDone = false;
  public durationMsPomodoro = 25*60*1000;
  public durationMsShort = 5*60*1000;
  public durationMsLong = 5*60*1000;
  public currentTimeMs:number = this.durationMsPomodoro;
  
  // dont thionk i have to do this in a function timer alsawys happy
  public timer = new Timer({interval: 1000, stopwatch: false});
  //always start on pomodoro setting
  public currentType = TimerType.pomodoro;

  //getters in this way can even be used similarily to a variable
  get durationMs() {
    switch (this.currentType) {
      case TimerType.pomodoro:
        
        return this.durationMsPomodoro;
      case TimerType.short:
        
        return this.durationMsShort;
      case TimerType.long:
      
        return this.durationMsLong;
    }
  }
  // set userDurationMsPomodoro(durationUpdate: number) {
  //   this.durationMsPomodoro = durationUpdate;
  //   localStorage.setItem("userDurationMsPomodoro", durationUpdate.toString());
  // }

  userDurationMsPomodoro(newDurationMs: number) {
    this.durationMsPomodoro = newDurationMs;
    localStorage.setItem("userDurationMsPomodoro", newDurationMs.toString());
  }
  userDurationMsShort(durationMsUpdate: number) {
    this.durationMsShort = durationMsUpdate;
    localStorage.setItem("userDurationMsShort", durationMsUpdate.toString());
  }
  userDurationMsLong(durationMsUpdate: number) {
    this.durationMsLong = durationMsUpdate;
    localStorage.setItem("userDurationMsLong", durationMsUpdate.toString());
  }

  interactStartButton() {
    if (this.timer.status == "paused") {
        this.timer.resume();
        this.isTimerRunning = true;
        console.log("timer was resumed, state now true")
    } else if (this.timer.status == "running") {
        this.timer.pause();
        this.isTimerRunning = false;
        console.log("timer was paused, state now false")
    } else {
        this.timer.start(this.durationMs);
        this.isTimerRunning = true;
        console.log("timer was started, state now true")
    }
    this.isTimerDone = false;
  }

  // when settings change while timer was running: reset timer
  resetTimer() {
    this.timer.stop();
  }

  //muss jetzt eig nciht mehr ausgelagert werden, da durch timer ablauf der auch automatisch abgeschafft wird (keine neue creation nötig)
  constructor() {
    this.timer.on('tick', (ms) => {
      this.currentTimeMs = ms;
    });
    this.timer.on('done', () => {
      this.currentTimeMs = this.durationMs;
      this.isTimerDone = true;
      console.log("timer done");
    });
    if (localStorage.getItem("userDurationMsPomodoro") != null) {
      this.durationMsPomodoro = parseInt(JSON.parse(localStorage.getItem("userDurationMsPomodoro")!));
    }
    if (localStorage.getItem("userDurationMsShort") != null) {
      this.durationMsShort = parseInt(JSON.parse(localStorage.getItem("userDurationMsShort")!));
    }
    if (localStorage.getItem("userDurationMsLong") != null) {
      this.durationMsLong = parseInt(JSON.parse(localStorage.getItem("userDurationMsLong")!));
    }
    this.currentTimeMs = this.durationMsPomodoro;
  }
}

// enums existieren auf klassenlevel -> exports.keyword, ist syntaxsugar, die drei zahlen sind theoretisch auch gleichzeitig der default
export enum TimerType{
  pomodoro = 0, 
  short = 1,
  long = 2
}
