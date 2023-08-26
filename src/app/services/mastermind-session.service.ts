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
  public sessionDTO!: SessionDTO;
  public ses: BehaviorSubject<SessionDTO> = new BehaviorSubject<SessionDTO>(new SessionDTO(false, false, [], false, 0, [], false, '', []));
  private results: BehaviorSubject<Result[]>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.results = new BehaviorSubject<Result[]>(this.getResults());
  }

  private getResults(): Result[] {
    let results: Result[] = new Array();
    for (let i = 0; i < this.sessionDTO.currentAttempt; i++) {
      results.push(new Result(this.sessionDTO.proposedCombinations[i], this.sessionDTO.blacks[i], this.sessionDTO.whites[i]));
    }
    for (let i = 0; i < this.sessionDTO.currentAttempt - 10; i++) {//TODO elminar numeros y string magicos y tal vez esta parte la deberia de hacer el play view
      results.push(new Result('eeee', 0, 0));
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
        console.log(this.sessionDTO);
        this.showResults();
        this.ses.next(this.sessionDTO);
        console.log('ses en el service', this.ses);
      }
    );
  }

  public showResults() {
    this.httpClient.get(`${this.baseUrl}/showResults`).subscribe();
  }

  private putProposedCombination(combination: string): Observable<any> {
    return this.httpClient.put<string>(`${this.baseUrl}/play/addProposedCombination`, combination);
  }

  get sesObservable() {
    return this.ses.asObservable();
  }

  get proposedCombinations(): string[] {
    return this.ses.value.proposedCombinations;
  }
}