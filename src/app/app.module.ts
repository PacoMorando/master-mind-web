import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StartViewComponent } from './components/start-view/start-view.component';
import { PlayViewComponent } from './components/play-view/play-view.component';
import { ResumeViewComponent } from './components/resume-view/resume-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MastermindSessionService } from './services/mastermind-session.service';
import { Routes, RouterModule } from '@angular/router';
import { CombinationPickerComponent } from './components/play-view/combination-picker/combination-picker.component';
import { SaveViewComponent } from './components/save-view/save-view.component';

const routes: Routes = [
  { path: 'start', component: StartViewComponent },
  { path: 'play', component: PlayViewComponent },
  { path: 'save', component: SaveViewComponent },
  { path: 'resume', component: ResumeViewComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' },//si no pones nada te manda a /products
  { path: '**', redirectTo: '/start', pathMatch: 'full' }//si pones una mensada te manda a /products, aqui se podria poner una pagina de no encontrado
];

@NgModule({
  declarations: [
    AppComponent,
    StartViewComponent,
    PlayViewComponent,
    ResumeViewComponent,
    CombinationPickerComponent,
    SaveViewComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MastermindSessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
