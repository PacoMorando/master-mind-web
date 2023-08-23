import { Component } from '@angular/core';
import { MastermindSessionService } from 'src/app/services/mastermind-session.service';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent {
  tokenColor = 'token-red';
  tokenColorOne = 'token-red';
  colorsProposed: string[];
  proposedCombinations: number[] = new Array(10);//TODO refactorizar con los valores del modelo

  constructor(private mastermindService: MastermindSessionService) {
    this.colorsProposed = ['O', 'O', 'O', 'O'];
  }
}