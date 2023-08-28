import { Component, OnInit } from '@angular/core';
import { MastermindSessionService } from 'src/app/services/mastermind-session.service';
import { StartService } from 'src/app/services/start.service';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {

  constructor(private startService: StartService) {
  }
  // constructor(private mastermindService: MastermindSessionService) {
  // }

  ngOnInit(): void {
    this.startService.getStartView();
    console.log('Se ejecuto el OnInit');
  }

  protected newGame() {
    this.startService.newGame();
  }
  
}