import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { SessionDTO } from './session-dto';
import { Router } from '@angular/router';
import { ResponseSession } from './response-session';
import { Result } from '../components/play-view/result';

@Injectable({
  providedIn: 'root'
})
export class MastermindSessionService {
  private baseUrl = 'http://localhost:8080/mastermind';
  public sessionDTO: SessionDTO;
  private results: BehaviorSubject<Result[]>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.sessionDTO =  new SessionDTO(false,false,[],false,0,[],false,'',[]);//TODO tengo que refactorizar esta session, si no la inicializo da error de undefinte (null)
    this.results = new BehaviorSubject<Result[]>(this.getResults());
  }

  private getResults(): Result[] {
    let results: Result[] = new Array();
    for (let i = 0; i < this.sessionDTO.currentAttempt; i++) {
      results.push(new Result(this.sessionDTO.proposedCombinations[i], this.sessionDTO.blacks[i], this.sessionDTO.whites[i]));
    }
    return results;
  }

  public getStartView() {
    this.httpClient.get(`${this.baseUrl}/main`).subscribe();
  }

  public newGame() {
    this.getNewGame().subscribe(
      data => {
        this.sessionDTO = data;
        console.log(this.sessionDTO);
      }
    );

    this.router.navigate(['/play']);
  }

  private getNewGame(): Observable<SessionDTO> {
    return this.httpClient.get<ResponseSession>(`${this.baseUrl}/start/newGame`).pipe(
      map(reponse => reponse)
    );
  }

  public addProposedCombination(combination: string) {
    this.putProposedCombination(combination).subscribe(
      respose => {
        this.sessionDTO = respose;
        console.log(this.sessionDTO, 'SessionDTO in addProposedCombination');
        this.showResults();
        this.results.next(this.getResults());
      }
    );
  }

  private showResults() {
    this.httpClient.get(`${this.baseUrl}/showResults`).subscribe();
  }

  private putProposedCombination(combination: string): Observable<any> {
    return this.httpClient.put<string>(`${this.baseUrl}/play/addProposedCombination`, combination);
  }

  get resultsObservable() {
    return this.results.asObservable();
  }
}