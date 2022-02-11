import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatDialogModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentBoxComponent } from './components/content-box/content-box.component';
import { TimerButtonComponent } from './components/timer-button/timer-button.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentBoxComponent,
    TimerButtonComponent,
    HeaderComponent,
    SettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SettingsDialogComponent]
})
export class AppModule { }