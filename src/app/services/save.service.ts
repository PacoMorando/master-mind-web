import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private baseUrl = 'http://localhost:8080/mastermind';

  constructor(private httpClient: HttpClient, private router: Router) { }

  public saveGame(gameName: string) {
    this.httpClient.get(`${this.baseUrl}/save/saving?gameName=${gameName}`).subscribe();
    this.router.navigate(['/resume']);
  }

}
