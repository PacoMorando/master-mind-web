import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseSession } from './response-session';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Result } from '../components/play-view/result';
import { BoardDTO } from './board-dto';

@Injectable({
  providedIn: 'root'
})

export class PlayService {
  private baseUrl = 'http://localhost:8080/api/mastermind';
  private boardDTO!: BoardDTO;
  private results!: BehaviorSubject<Result[]>;
  private storage: Storage = sessionStorage;

  constructor(private httpClient: HttpClient, private router: Router) {
    console.log("Constructor Play Service")
    this.boardDTO = new BoardDTO();
  }

  public getBoardDTO(): Observable<BoardDTO> {
    return this.httpClient.get<BoardDTO>(`${this.baseUrl}/play`).pipe(tap(response => {
      console.log('Operador TAP', response);
      this.boardDTO = response;
      this.results = new BehaviorSubject<Result[]>(this.getResults());
      this.persistSession();
    }));
  }

  public addProposedCombination(combination: string) {
    this.httpClient.put<ResponseSession>(`${this.baseUrl}/play/addProposedCombination`, combination).subscribe(
      respose => {
        this.boardDTO = respose;
        this.persistSession();
        console.log(this.boardDTO);
      }
    );
  }

  public getSecretCombination(): string[] {
    return Array.from(this.boardDTO.secretCombination);
  }

  public isFinished(): boolean {
    return this.boardDTO.finished;
  }

  public isWinner(): boolean {
    return this.boardDTO.winner;
  }

  public undo() {
    this.httpClient.get<ResponseSession>(`${this.baseUrl}/play/undo`).subscribe(response => {
      this.boardDTO = response
      this.persistSession();
    });
  }

  public redo() {
    this.httpClient.get<ResponseSession>(`${this.baseUrl}/play/redo`).subscribe(response => {
      this.boardDTO = response
      this.persistSession();
    });
  }

  private getResults(): Result[] {
    let results: Result[] = new Array();
    for (let i = 0; i < this.boardDTO.currentAttempt; i++) {
      results.push(new Result(this.boardDTO.proposedCombinations[i], this.boardDTO.blacks[i], this.boardDTO.whites[i]));
    }
    return results;
  }

  private persistSession() {
    this.storage.setItem('session', JSON.stringify(this.boardDTO));//alamceno los datos en la memoria del explorador
    this.results.next(this.getResults());
  }

  get resultsObservable() {
    return this.results.asObservable();
  }

  public exit() {
    this.restBoard();
    this.httpClient.get(`${this.baseUrl}/play/exit`).subscribe();
  }

  private restBoard() {
    this.storage.clear();
    this.boardDTO = new BoardDTO();
    this.results = new BehaviorSubject<Result[]>([]);
  }

  public resume() {
    this.httpClient.get(`${this.baseUrl}/play/exit`).subscribe();
    this.router.navigate(['/resume']);
  }

  public save() {
    this.storage.clear();
    this.router.navigate(['/save']);
  }

  public isUndoable(): boolean {
    return this.boardDTO.undoable;
  }

  public isRedoable(): boolean {
    return this.boardDTO.redoable;
  }

  public currentAttempt(): number {
    return this.boardDTO.currentAttempt;
  }
}