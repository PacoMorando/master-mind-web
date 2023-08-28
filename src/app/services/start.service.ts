import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionDTO } from './session-dto';
import { Observable, map } from 'rxjs';
import { ResponseSession } from './response-session';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  private baseUrl = 'http://localhost:8080/mastermind';
  public sessionDTO!: SessionDTO;

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
  
}
