import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  private baseUrl = 'http://localhost:8080/api/mastermind';
  private storage: Storage = sessionStorage;
  protected gamesNames!: BehaviorSubject<string[]>;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public getStartView() {
    this.storage.clear();
    return this.httpClient.get(`${this.baseUrl}/main`);
  }

  public newGame() {
    this.httpClient.get(`${this.baseUrl}/start/newGame`).subscribe(data => {
      console.log('NewGame Data', data);
      this.router.navigate(['/play']);
    });
  }

  public openGame(gameName: string) {
    this.httpClient.get(`${this.baseUrl}/start/openGame?gameName=${gameName}`).subscribe(data =>{
      console.log('OpenGame Data',data);
      this.router.navigate(['/play']);
    });
  }

  public getGamesNames(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/start/getGamesNames`).pipe();
  }


  get gamesNamesAsObservable() {
    return this.gamesNames.asObservable();
  }
}