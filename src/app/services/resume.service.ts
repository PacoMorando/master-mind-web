import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private baseUrl = 'http://localhost:8080/api/mastermind';

  constructor(private httpClient: HttpClient, private router: Router) { }

  public continue() {
    this.httpClient.get(`${this.baseUrl}/resume/continue`).subscribe(() => {
      this.router.navigate(['/start']);
    });
  }

  public exit (){
    this.httpClient.get(`${this.baseUrl}/resume/exit`).subscribe(()=>{
      window.location.href = 'https://github.com/PacoMorando';
    });
  }
}
