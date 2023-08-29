import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseSession } from './response-session';
import { SessionDTO } from './session-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Result } from '../components/play-view/result';

@Injectable({
  providedIn: 'root'
})

export class PlayService {
  private baseUrl = 'http://localhost:8080/mastermind';
  public sessionDTO: SessionDTO;
  private results: BehaviorSubject<Result[]>;
  storage: Storage = sessionStorage;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.sessionDTO = new SessionDTO(false, false, [], false, 0, [], false, '', []);//TODO tengo que refactorizar esta session, si no la inicializo da error de undefinte (null)
    this.results = new BehaviorSubject<Result[]>(this.getResults());

    let data = JSON.parse(this.storage.getItem('session')!);//"cartItems es la Key (clave)" y se recuperan los datos almacenados en el metodo persistCartItem()
    console.log('DATA FUERA DEL IF', data)
    if (data != null) {
      this.sessionDTO = data;
    }
    console.log('SESSIOM SERVICES CONSTRUCT', this.sessionDTO)
    console.log('DATA', data)

    this.persistSession();
    this.results.next(this.getResults());
  }

  public addProposedCombination(combination: string) {
    this.putProposedCombination(combination).subscribe(
      respose => {
        this.sessionDTO = respose;
        console.log(this.sessionDTO, 'SessionDTO in addProposedCombination');
        this.showResults();
        this.results.next(this.getResults());
        this.persistSession();
      }
    );
  }

  private showResults() {
    this.httpClient.get(`${this.baseUrl}/showResults`).subscribe();
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

  private putProposedCombination(combination: string): Observable<any> {
    return this.httpClient.put<string>(`${this.baseUrl}/play/addProposedCombination`, combination);
  }

  public undo() {
    this.httpClient.get<ResponseSession>(`${this.baseUrl}/play/undo`).subscribe(response => {
      this.sessionDTO = response
      console.log('UNDO:', this.sessionDTO);
      this.persistSession();
      this.results.next(this.getResults());
    });
  }

  public redo() {
    this.httpClient.get<ResponseSession>(`${this.baseUrl}/play/redo`).subscribe(response => {
      this.sessionDTO = response
      console.log('REDO:', this.sessionDTO);
      this.persistSession();
      this.results.next(this.getResults())
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
  }

  get resultsObservable() {
    return this.results.asObservable();
  }

  public save(){
    this.storage.clear();
    this.router.navigate(['/save']);
  }

  public resume(){
    this.storage.clear();
    this.httpClient.get(`${this.baseUrl}/play/exit`).subscribe();
    this.router.navigate(['/resume']);
  }
}