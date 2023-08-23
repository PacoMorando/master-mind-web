import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SessionDTO } from './session-dto';
import { Router } from '@angular/router';
import { ResponseSession } from './response-session';

@Injectable({
  providedIn: 'root'
})
export class MastermindSessionService {
  private baseUrl = 'http://localhost:8080/mastermind';
  public sessionDTO?: SessionDTO;

  constructor(private httpClient: HttpClient, private router: Router) {
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
      }
    );
  }

  public showResults() {
    this.httpClient.get(`${this.baseUrl}/showResults`).subscribe();
  }

  private putProposedCombination(combination: string): Observable<any> {
    return this.httpClient.put<string>(`${this.baseUrl}/play/addProposedCombination`, combination);
  }
}