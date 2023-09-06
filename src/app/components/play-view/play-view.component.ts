import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from './result';
import { PlayService } from 'src/app/services/play.service';
import { SessionDTO } from 'src/app/services/session-dto';

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
    console.log("Constructor Play View")
    //this.showBoard();
  }

  //NO ESTOY SEGURO DE ESTE
  ngOnInit(): void {
    this.isFinishedModal = new window.bootstrap.Modal(document.getElementById("isFinishedModal"));
    this.playService.getBoardDTO().subscribe(data => {
      console.log('PLAY VIEW INIT= ', data);
      this.showBoard();
    });
    console.log("INIT Play View");
  }

  private showBoard() {
    let results$: Observable<Result[]> = this.playService.resultsObservable;
    results$.subscribe(data => {
      this.results = data;
      console.log('SHOWBOARD');
      this.setBoard();
      this.showFinishModal();
    });
  }

  private setBoard() {
    for (let i = 0; i < this.maxAttemps - this.playService.currentAttempt(); i++) {
      console.log('SessionDTO Current Attempt', this.playService.currentAttempt());
      this.results.push(new Result(this.emptyCombination, 0, 0));
    }
  }

  private showFinishModal() {
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
  }

  protected resume() {
    this.results = new Array();
    console.log('TO RESUME result Array simple', this.results);
    this.playService.resume();
  }

  protected save() {
    this.playService.save();
  }

  get isUndoable(): boolean {
    return !this.playService.isUndoable();
  }

  get isRedoable(): boolean {
    return !this.playService.isRedoable();
  }
}