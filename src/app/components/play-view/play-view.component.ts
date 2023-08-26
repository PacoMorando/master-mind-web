import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MastermindSessionService } from 'src/app/services/mastermind-session.service';
import { Result } from './result';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent {
  private readonly maxAttemps: number = 10;
  private readonly emptyCombination: string = "eeee";
  private results$: Observable<Result[]>;
  protected results: Result[] = new Array();

  constructor(private mastermindService: MastermindSessionService) {
    this.results$ = this.mastermindService.resultsObservable;
    this.results$.subscribe(data => {
      console.log('SUBSCRIBE DEL RESULTS$');
      console.log(this.results$, 'result$ Observable');
      this.results = data;
      console.log(this.results, 'result Array simple');
      for (let i = 0; i < this.maxAttemps - this.mastermindService.sessionDTO.currentAttempt; i++) {
        this.results.push(new Result(this.emptyCombination, 0, 0));
      }
    });
  }
}