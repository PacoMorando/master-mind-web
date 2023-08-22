import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SessionDTO } from './session-dto';

@Injectable({
  providedIn: 'root'
})
export class MastermindSessionService {
  private baseUrl = 'http://localhost:8080/mastermind';
  public sessionDTO?: SessionDTO;

  constructor(private httpClient: HttpClient) {

  }

  getStartView() {
    this.httpClient.get(`${this.baseUrl}/main`).subscribe();
  }

  newGame(): Observable<SessionDTO> {
    return this.httpClient.get<GetResponsePlay>(`${this.baseUrl}/start/newGame`).pipe(
      map(reponse => reponse)
    );
  }

}

interface GetResponsePlay {
  "finished": boolean,
  "undoable": boolean,
  "whites": string[],
  "winner": boolean,
  "currentAttempt": number,
  "blacks": number[],
  "redoable": boolean,
  "secretCombination": string,
  "proposedCombinations": string[]
}