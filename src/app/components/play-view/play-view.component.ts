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
  protected results: Result[] = new Array();

  constructor(private mastermindService: MastermindSessionService) {
    this.setResults();
  }

  private setResults() {
    let results$: Observable<Result[]> = this.mastermindService.resultsObservable;
    results$.subscribe(data => {
      this.results = data;
      console.log('SUBSCRIBE DEL RESULTS$');
      console.log(results$, 'result$ Observable');
      console.log(this.results, 'result Array simple');
      this.setBoard();
    });
  }
  private setBoard() {
    for (let i = 0; i < this.maxAttemps - this.mastermindService.sessionDTO.currentAttempt; i++) {
      this.results.push(new Result(this.emptyCombination, 0, 0));
    }
  }

  protected undo(){
    this.mastermindService.undo();
  }

  protected redo(){
    this.mastermindService.redo();
  }
}