import { Component, OnInit } from '@angular/core';
import { StartService } from 'src/app/services/start.service';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {
  protected gameNames: string[] = [];

  constructor(private startService: StartService) {
  }

  ngOnInit(): void {
    this.startService.getStartView();
    console.log('Se ejecuto el OnInit');
    this.startService.getGamesNames().subscribe(data => {
      this.gameNames = data;
      console.log(this.gameNames);
    });
  }

  protected newGame() {
    this.startService.newGame();
  }

  protected openGame(gameName: string) {
    console.log(`Clickaste: ${gameName}`);
    this.startService.openGame(gameName);
  }

}