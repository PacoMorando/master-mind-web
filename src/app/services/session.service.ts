import { Injectable } from '@angular/core';
import { SessionDTO } from './session-dto';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly baseUrl = 'http://localhost:8080/mastermind';
  public sessionDTO!: SessionDTO;

  constructor() { }
}
