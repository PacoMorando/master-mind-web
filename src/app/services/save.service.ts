import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private baseUrl = 'http://localhost:8080/mastermind';
  private nameExist: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public updateGame() {
    this.httpClient.get<boolean>(`${this.baseUrl}/save/hasName`).subscribe( hasNameResponse => {
      if(hasNameResponse == true){
        this.router.navigate(['/resume']);
        this.httpClient.get(`${this.baseUrl}/main`).subscribe();
      }
    });
  }

  public saveGame(gameName: string) {
    this.httpClient.get(`${this.baseUrl}/save/saving?gameName=${gameName}`).subscribe(() => {
      this.router.navigate(['/resume']);
    });
    console.log(`Has guardado la partida: ${gameName}`);
  }

  public exist(gameName: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/save/exist?gameName=${gameName}`).pipe(tap(response => {
      this.nameExist = response;
    }));
  }

  public get isNameExist() {
    return this.nameExist;
  }

}