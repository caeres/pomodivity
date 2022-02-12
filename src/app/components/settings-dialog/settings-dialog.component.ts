import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>
  ) { }

  onDismiss(): void {
    this.dialogRef.close();
  }

  // save settings, :VOID is gonna be wrong then
  onClickSave(): void {
    this.dialogRef.close();
  }
  

  ngOnInit(): void {
  }

}
