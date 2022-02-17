import { Injectable } from '@angular/core';
import Timer from 'tiny-timer';

@Injectable({
  providedIn: 'root'
})

export class TimerStateService{

  public isTimerRunning = false;
  public durationMsPomodoro = 25*60*1000;
  public durationMsShort = 5*60*1000;
  public durationMsLong = 10*60*1000;
  public currentTimeMs = this.durationMsPomodoro;
  
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
  }

  // kommunikation: aktuell nur ein funktionscall, frontend weiß neueen state nicht -> ipdate view auch hier wieder
  // RXjS -> Statemanagement, streams (in ner stream-var der timerState -> bei änderung stream.send -> aktueller state wird verschickt (das sind die observerables buddy))
  /* behviorsubject hier prolly -> start state kann eingegeben werden
  innerhalb einer c */


  //muss jetzt eig nciht mehr ausgelagert werden, da durch timer ablauf der auch automatisch abgeschafft wird (keine neue creation nötig)
  constructor() {
    this.timer.on('tick', (ms) => {
      this.currentTimeMs = ms;
    });
    this.timer.on('done', () => {
      console.log("timer done");
    });
  }

}

// enums existieren auf klassenlevel -> exports.keyword, ist syntaxsugar, die drei zahlen sind theoretisch auch gleichzeitig der default
export enum TimerType{
  pomodoro = 0, 
  short = 1,
  long = 2
}
