import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from './result';
import { PlayService } from 'src/app/services/play.service';

declare var window: any;

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})

export class PlayViewComponent implements OnInit {
  private readonly maxAttemps: number = 10;
  private readonly emptyCombination: string = "eeee";
  protected results: Result[] = new Array();
  private isFinishedModal: any;

  constructor(private playService: PlayService) {
    this.showResults();
  }
  ngOnInit(): void {
    this.isFinishedModal = new window.bootstrap.Modal(document.getElementById("isFinishedModal"));
  }

  private showResults() {
    let results$: Observable<Result[]> = this.playService.resultsObservable;
    results$.subscribe(data => {
      this.results = data;
      console.log('result$ Observable', results$);
      console.log('result Array simple', this.results);
      this.setBoard();
      this.showFinishModal();
    });
  }

  private setBoard() {
    for (let i = 0; i < this.maxAttemps - this.playService.sessionDTO.currentAttempt; i++) {
      console.log('SessionDTO Current Attempt', this.playService.sessionDTO.currentAttempt);
      this.results.push(new Result(this.emptyCombination, 0, 0));
    }
  }

  protected showFinishModal() {
    if (this.playService.isFinished()) {
      this.isFinishedModal.show();
    }
  }

  protected finishMessages(): string {
    if (this.playService.isWinner()) {
      return "You Have Won :-)";
    } else {
      return "You Have Lost :-(";
    }
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

  protected exit() {
    this.playService.exit();
    //Este manda la api al saveView se ejecuta en el Modal>Quires salir?>Yes
  }

  protected resume() {
    //Este manda la api al resumeView se ejecuta en el Modal>Quires Guardar?>No
    this.results = new Array();
    console.log('TO RESUME result Array simple', this.results);
    this.playService.resume();
  }

  protected save() {
    this.playService.save();
  }
}