import { Component, OnInit } from '@angular/core';
import { MastermindSessionService } from 'src/app/services/mastermind-session.service';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {

  constructor(private mastermindService: MastermindSessionService) {
  }

  ngOnInit(): void {
    this.mastermindService.getStartView();
    console.log('Se ejecuto el OnInit');
  }

  newGame() {
    this.mastermindService.newGame();
  }
}