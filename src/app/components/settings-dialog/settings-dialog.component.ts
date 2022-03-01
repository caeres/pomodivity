import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TimerStateService, TimerType } from 'src/app/services/timer-state.service';
import { HeaderComponent } from '../header/header.component';
import { FormControl, Validators } from '@angular/forms';

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

  errorMessageTextRequired = "Please enter a value.";
  errorMessageTextPattern = "Number between 1 and 60."; 

  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    public timer: TimerStateService
  ) { }
  ngOnInit(): void {  }

  // same here: there prolly is a "one-funciton" solution via a formgroup or something but nah, this works :D
get errorMessage() {
  // Checks pomodoro settings field
  if (this.pomoCheck.hasError('required')) return this.errorMessageTextRequired;
  if (this.pomoCheck.hasError('pattern')) return this.errorMessageTextPattern;
  // Checks short settings field
  if (this.shortCheck.hasError('pattern')) return this.errorMessageTextPattern;
  if (this.shortCheck.hasError('required')) return this.errorMessageTextRequired;
  // Checks pomodoro settings field
  if (this.longCheck.hasError('pattern')) return this.errorMessageTextPattern;
  if (this.longCheck.hasError('required')) return this.errorMessageTextRequired;
  return "";
}

  // on click with errors -> animation
  onClickSave(pomoValue : string, shortValue : string, longValue : string): void {
    if (this.errorMessage != "") {
       console.log("There was at least one error")
      //  angry wiggle soon
     }
    else {
      this.timer.userDurationMsPomodoro(parseInt(pomoValue)*60*1000);
      this.timer.userDurationMsShort(parseInt(shortValue)*60*1000);
      this.timer.userDurationMsLong(parseInt(longValue)*60*1000);
      console.log("The timer settings have been updated")
      this.dialogRef.close();
      if (this.timer.currentType == TimerType.pomodoro) {
        this.timer.currentTimeMs = this.timer.durationMsPomodoro;
      } else if (this.timer.currentType == TimerType.short) {
        this.timer.currentTimeMs = this.timer.durationMsShort;
      } else {
        this.timer.currentTimeMs = this.timer.durationMsLong;
      }
      this.timer.resetTimer();
    }
  }
  onDismiss(): void {
    this.dialogRef.close();
  }
}
