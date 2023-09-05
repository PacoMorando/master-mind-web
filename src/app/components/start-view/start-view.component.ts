import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StartService } from 'src/app/services/start.service';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {
  // protected gamesNames: string[] = new Array();
  protected gamesNamesTest: string[] = [];

  constructor(private startService: StartService) {
  }

  ngOnInit(): void {
    this.startService.getStartView();
    console.log('Se ejecuto el OnInit');
    // console.log(this.gamesNames);
    this.startService.getGamesNamesTest().subscribe(data => {
      this.gamesNamesTest = data;
      console.log(this.gamesNamesTest);
    });
  }

  protected newGame() {
    this.startService.newGame();
  }

  // protected setGamesNames() {
  //   console.log(this.startService.getGamesNames());
  //   this.gamesNames = this.startService.getGamesNames();
  // }

  protected nameClicked(name: string) {
    console.log(`Clickaste: ${name}`);
  }

}