import { Component, OnInit } from '@angular/core';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: "480px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }

}
