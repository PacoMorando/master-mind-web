import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MastermindSessionService } from 'src/app/services/mastermind-session.service';
import { SessionDTO } from 'src/app/services/session-dto';
import { Result } from './result';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent {
  private readonly maxAttemps: number = 10;
  private readonly emptyCombination: string = "eeee";
  protected proposedCombinationsTest: string[] = new Array(this.maxAttemps);
  protected ses$: Observable<SessionDTO>;
  protected results$: Observable<Result[]>;
  protected results: Result[] = new Array();

  constructor(private mastermindService: MastermindSessionService) {
    this.ses$ = this.mastermindService.sesObservable;
    this.results$ = this.mastermindService.resultsObservable;
    this.results$.subscribe(data => {
      console.log(this.results$);
      console.log('subscribe del results');
      this.results = data;
      console.log(this.results);
    });
    this.ses$.subscribe(() => {
      //console.log('on init playview ses$:', this.ses$);
     // this.proposedCombinationsTest = this.setProposedCobinationhs();
    });
  }

  private setProposedCobinationhs(): string[] {
    let proposedCombinations: string[] = this.mastermindService.proposedCombinations;
    let fill: number = this.maxAttemps - this.mastermindService.proposedCombinations.length;
    console.log(fill)
    for (let i = 0; i < fill; i++) {//-currentAttemp
      proposedCombinations.push(this.emptyCombination);
    }
    return proposedCombinations;
  }

  // protected getColorCombination(combination: string): string[] {
  //   return Array.from(combination);
  // }
}