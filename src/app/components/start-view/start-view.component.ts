import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MastermindSessionService } from 'src/app/services/mastermind-session.service';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {

  constructor(private mastermindService: MastermindSessionService, 
              private router: Router) { }

  ngOnInit(): void {
    this.mastermindService.getStartView();
    console.log('Se ejecuto el OnInit')
  }
  
  newGame(){
    this.mastermindService.newGame().subscribe(
      data => {
        this.mastermindService.sessionDTO = data;
        console.log(data);
        console.log(this.mastermindService.sessionDTO);
      }
    );
    console.log("Picaste New Game");
    this.router.navigate(['/play']);//TODO probar si se puede redireccionar desde el servidor
  }
}