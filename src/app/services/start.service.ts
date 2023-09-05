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
  public sessionDTO!: SessionDTO;
  storage: Storage = sessionStorage;
  // protected gamesNames: string[] = new Array();
  protected gamesNamesTest!:  BehaviorSubject <string[]>;

  constructor(private httpClient: HttpClient, private router: Router) {
  //  this.gamesNamesTest = this.getGamesNamesTest()
  }

  public getStartView() {
    this.storage.clear();
    this.httpClient.get(`${this.baseUrl}/main`).subscribe();
    // this.httpClient.get<string[]>(`${this.baseUrl}/start/getGamesNames`).subscribe(
    //   response => {
    //     // this.gamesNames = response;
    //     console.log(response);
      
    //   });
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
      map(reponse => reponse)//Auqi no se si estoy seguro que debo hacer este map
    );
  }

  // public getGamesNames(): string[] {
  //   return this.gamesNames;
  // }

  public getGamesNamesTest(): Observable<string[]> {
   return this.httpClient.get<string[]>(`${this.baseUrl}/start/getGamesNames`).pipe(
      map (response => response));
  }


  get gamesNamesTestAsObservable(){
    return this.gamesNamesTest.asObservable();
  }
}