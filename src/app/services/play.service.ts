import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseSession } from './response-session';
import { SessionDTO } from './session-dto';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Result } from '../components/play-view/result';

@Injectable({
  providedIn: 'root'
})

export class PlayService {
  private baseUrl = 'http://localhost:8080/mastermind';
  private sessionDTO!: SessionDTO;
  public results!: BehaviorSubject<Result[]>;
  storage: Storage = sessionStorage;

  constructor(private httpClient: HttpClient, private router: Router) {
    console.log("Constructor Play Service")
    this.sessionDTO = new SessionDTO(false, false, [], false, 0, [], false, '', []);//TODO tengo que refactorizar esta session, si no la inicializo da error de undefinte (null)
    this.results = new BehaviorSubject<Result[]>(this.getResults());
    let data = JSON.parse(this.storage.getItem('session')!);//"session es la Key (clave)" y se recuperan los datos almacenados en el metodo persistCartItem()
    if (data != null) {
      this.sessionDTO = data;
    }
    this.persistSession();
  }

  public getBoardDTO(): Observable<SessionDTO> {
    return this.httpClient.get<SessionDTO>(`${this.baseUrl}/play`).pipe(map(response => response))
  }

  public addProposedCombination(combination: string) {
    this.httpClient.put<ResponseSession>(`${this.baseUrl}/play/addProposedCombination`, combination).subscribe(
      respose => {
        this.sessionDTO = respose;
        this.persistSession();
        console.log(this.sessionDTO);
      }
    );
  }

  public getSecretCombination(): string[] {
    return Array.from(this.sessionDTO.secretCombination);
  }

  public isFinished(): boolean {
    return this.sessionDTO.finished;
  }

  public isWinner(): boolean {
    return this.sessionDTO.winner;
  }

  public undo() {
    this.httpClient.get<ResponseSession>(`${this.baseUrl}/play/undo`).subscribe(response => {
      this.sessionDTO = response
      this.persistSession();
    });
  }

  public redo() {
    this.httpClient.get<ResponseSession>(`${this.baseUrl}/play/redo`).subscribe(response => {
      this.sessionDTO = response
      this.persistSession();
    });
  }

  private getResults(): Result[] {
    let results: Result[] = new Array();
    for (let i = 0; i < this.sessionDTO.currentAttempt; i++) {
      results.push(new Result(this.sessionDTO.proposedCombinations[i], this.sessionDTO.blacks[i], this.sessionDTO.whites[i]));
    }
    return results;
  }

  private persistSession() {
    this.storage.setItem('session', JSON.stringify(this.sessionDTO));//alamceno los datos en la memoria del explorador
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
    this.sessionDTO = new SessionDTO(false, false, [], false, 0, [], false, '', []);//TODO tengo que refactorizar esta session, si no la inicializo da error de undefinte (null)
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
    return this.sessionDTO.undoable;
  }

  public isRedoable(): boolean {
    return this.sessionDTO.redoable;
  }

  public currentAttempt(): number {
    return this.sessionDTO.currentAttempt;
  }
}