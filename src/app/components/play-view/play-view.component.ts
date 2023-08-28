import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from './result';
import { PlayService } from 'src/app/services/play.service';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})

export class PlayViewComponent {
  private readonly maxAttemps: number = 10;
  private readonly emptyCombination: string = "eeee";
  protected results: Result[] = new Array();


  constructor(private playService: PlayService) {
    this.showResults();
  }

  private showResults() {
    let results$: Observable<Result[]> = this.playService.resultsObservable;
    results$.subscribe(data => {
      this.results = data;
      console.log(results$, 'result$ Observable');
      console.log(this.results, 'result Array simple');
      this.setBoard();
    });
  }

  private setBoard() {
    for (let i = 0; i < this.maxAttemps - this.playService.sessionDTO.currentAttempt; i++) {
      this.results.push(new Result(this.emptyCombination, 0, 0));
    }
  }

  private showFinishDialog() {
  }

  protected getSecretCombination(): string[] {
    if (this.playService.isFinished()) {
      return this.playService.getSecretCombination();
    }
    return ['t-s', 't-s', 't-s', 't-s'];
  }

  protected undo() {
    this.playService.undo();
  }

  protected redo() {
    this.playService.redo();
  }
}