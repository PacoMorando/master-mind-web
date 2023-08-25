import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MastermindSessionService } from 'src/app/services/mastermind-session.service';
import { SessionDTO } from 'src/app/services/session-dto';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent implements OnInit {
  private readonly maxAttemps: number = 10;
  private readonly emptyCombination: string = "eeee";
  //protected proposedCombinations: string[] = new Array(10);//TODO refactorizar con los valores del modelo
  protected proposedCombinationsTest: string[] = new Array(this.maxAttemps);//TODO refactorizar con los valores del modelo
  protected ses$: Observable<SessionDTO>;
  private sesSubscription!: Subscription;

  constructor(private mastermindService: MastermindSessionService) {
    this.ses$ = this.mastermindService.sesObservable;
    //this.ses$.subscribe(res => this.proposedCombinationsTest = res.proposedCombinations); //Aqui voy a escribir un metodo que tenga como parametro el res.propo...
    //this.proposedCombinationsTest = this.mastermindService.proposedCombinations;
  }

  ngOnInit(): void {
    this.sesSubscription = this.ses$.subscribe(response => {
      console.log('Nuevo valor de ses$:', response);
      //this.proposedCombinationsTest = this.mastermindService.proposedCombinations;
      this.proposedCombinationsTest = this.setProposedCobinationhs();
    });
  }

  private setProposedCobinationhs(): string[] {
    let proposedCombinations: string[] = this.mastermindService.proposedCombinations;
    let fill: number =  this.maxAttemps - this.mastermindService.proposedCombinations.length;
    console.log(fill)
    for (let i = 0; i < fill; i++) {//-currentAttemp
      proposedCombinations.push(this.emptyCombination);
    }
    return proposedCombinations;
  }

  protected getColorCombination(combination: string): string[] {
    return Array.from(combination);
  }
}