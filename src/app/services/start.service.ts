import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionDTO } from './session-dto';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ResponseSession } from './response-session';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  private baseUrl = 'http://localhost:8080/mastermind';
  private storage: Storage = sessionStorage;
  protected gamesNames!: BehaviorSubject<string[]>;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public getStartView() {
    this.storage.clear();
    this.httpClient.get(`${this.baseUrl}/main`).subscribe();
  }

  public newGame() {
    this.getNewGame();
    this.router.navigate(['/play']);
  }

  private getNewGame() {
    this.httpClient.get(`${this.baseUrl}/start/newGame`).subscribe();
  }

  public getGamesNames(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/start/getGamesNames`).pipe(
      map(response => response));
  }


  get gamesNamesAsObservable() {
    return this.gamesNames.asObservable();
  }
}