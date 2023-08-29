import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from './result';
import { PlayService } from 'src/app/services/play.service';

declare var window:any;

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})

export class PlayViewComponent implements OnInit {
  private readonly maxAttemps: number = 10;
  private readonly emptyCombination: string = "eeee";
  protected results: Result[] = new Array();
  private exampleModal: any;


  constructor(private playService: PlayService) {
    this.showResults();
  }
  ngOnInit(): void {
    this.exampleModal = new window.bootstrap.Modal(document.getElementById("exampleModal"));
  }

  private showResults() {
    let results$: Observable<Result[]> = this.playService.resultsObservable;
    results$.subscribe(data => {
      this.results = data;
      console.log(results$, 'result$ Observable');
      console.log(this.results, 'result Array simple');
      this.setBoard();
      this.showFinishDialog();
    });
  }

  private setBoard() {
    for (let i = 0; i < this.maxAttemps - this.playService.sessionDTO.currentAttempt; i++) {
      this.results.push(new Result(this.emptyCombination, 0, 0));
    }
  }


  //  showFinishDialog() {
  //   console.log('Se ejecuto el finishedDialog');
  //   const modalFinishDialog = document.getElementById('exampleModal');
  //   console.log('EVALUACION DEL IF: ',this.playService.isFinished(), modalFinishDialog);
  //   if (this.playService.isFinished() && modalFinishDialog != null){
  //     modalFinishDialog.style.display = 'block';
  //     console.log('Se ejecuto el if del is finished');
  //   }
  // }

  //  showFinishDialog() { //ESTA ES UNA ALTERNATIVA, BASICAMENTE ESTOY PONIENDO A MANO TODOS LOS VALORES, PERO VOY A BUSCAR SI HAY UNA CLASE QUE LO HAGA EN UN METODO
  //   const modalFinishDialog = document.getElementById('exampleModal');
  //   console.log(modalFinishDialog);
  //   if (modalFinishDialog != null){
  //     console.log(modalFinishDialog);
  //     modalFinishDialog.className = 'modal fade show';
  //     modalFinishDialog.style.display = 'block';
  //     modalFinishDialog.role = 'dialog';
  //     modalFinishDialog.ariaModal = 'true';
  //   }
  // }
  protected showFinishDialog() { //ESTA ES UNA ALTERNATIVA, BASICAMENTE ESTOY PONIENDO A MANO TODOS LOS VALORES, PERO VOY A BUSCAR SI HAY UNA CLASE QUE LO HAGA EN UN METODO
    this.exampleModal.show();
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