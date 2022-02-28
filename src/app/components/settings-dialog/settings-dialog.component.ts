import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TimerStateService, TimerType } from 'src/app/services/timer-state.service';
import { HeaderComponent } from '../header/header.component';
import { FormControl, Validators } from '@angular/forms';
import { ConvertTimePipe } from 'src/app/pipes/convert-time.pipe';


@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  // pretty sure a simple formGroup wouldve been possible as well but i cannot be arsed rn tbh
  pomoCheck = new FormControl('', [Validators.required, Validators.pattern('^([1-9]|[1-5][0-9]|60])$')]);
  shortCheck = new FormControl('', [Validators.required, Validators.pattern('^([1-9]|[1-5][0-9]|60])$')]);
  longCheck = new FormControl('', [Validators.required, Validators.pattern('^([1-9]|[1-5][0-9]|60])$')]);

  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    public timer: TimerStateService,
    public minuteToMsPipe: ConvertTimePipe
  ) { }
  ngOnInit(): void {  }

  // same here: there prolly is a "one-funciton" solution via a formgroup or something but nah, this works :D
  getPomoErrorMessage() {
    if (this.pomoCheck.hasError('required')) {
      return 'You must enter a value';
    }
    return this.pomoCheck.hasError('pattern') ? 'Enter a number between 1 and 60' : '';
  }
  getShortErrorMessage() {
    if (this.shortCheck.hasError('required')) {
      return 'You must enter a value';
    }
    return this.shortCheck.hasError('pattern') ? 'Enter a number between 1 and 60' : '';
  }
  getLongErrorMessage() {
    if (this.longCheck.hasError('required')) {
      return 'You must enter a value';
    }
    return this.longCheck.hasError('pattern') ? 'Enter a number between 1 and 60' : '';
  }
  // on click with errors -> animation
  onClickSave(pomoValue : string, shortValue : string, longValue : string): void {
    if (this.getPomoErrorMessage() != '' || this.getLongErrorMessage() != '' ||
     this.getShortErrorMessage() != '') {
       console.log("There was at least one error")
      //  angry wiggle soon
     }
    else {
      this.timer.userDurationMsPomodoro(this.minuteToMsPipe.transform(parseInt(pomoValue)));
      this.timer.userDurationMsShort(this.minuteToMsPipe.transform(parseInt(shortValue)));
      this.timer.userDurationMsLong(this.minuteToMsPipe.transform(parseInt(longValue)));
      console.log("The timer settings have been updated")
      this.dialogRef.close();
      // update currently shown timer -> check which timer is active, switch display to current timer duration
      // didint work cuz no return statements? help me oh great phillip
      // switch(this.timer.currentType) {
      //   case TimerType.pomodoro: 
      //     this.timer.currentTimeMs = this.timer.durationMsPomodoro;
      //   case TimerType.short:
      //     this.timer.currentTimeMs = this.timer.durationMsShort;
      //   case TimerType.long:
      //     this.timer.currentTimeMs = this.timer.durationMsLong;
      // }
      if (this.timer.currentType == TimerType.pomodoro) {
        this.timer.currentTimeMs = this.timer.durationMsPomodoro;
      } else if (this.timer.currentType == TimerType.short) {
        this.timer.currentTimeMs = this.timer.durationMsShort;
      } else {
        this.timer.currentTimeMs = this.timer.durationMsLong;
      }
    }
  }
  onDismiss(): void {
    this.dialogRef.close();
  }
}
