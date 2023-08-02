import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartViewComponent } from './components/start-view/start-view.component';
import { PlayViewComponent } from './components/play-view/play-view.component';
import { ResumeViewComponent } from './components/resume-view/resume-view.component';

@NgModule({
  declarations: [
    AppComponent,
    StartViewComponent,
    PlayViewComponent,
    ResumeViewComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
