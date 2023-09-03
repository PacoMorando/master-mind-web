import { Component } from '@angular/core';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-save-view',
  templateUrl: './save-view.component.html',
  styleUrls: ['./save-view.component.css']
})
export class SaveViewComponent {
  protected nameGame: string = "";

  constructor(private saveService: SaveService) { }

  protected printGameName() {
    this.saveService.saveGame(this.nameGame);
    console.log("Guardaste la partida con el nombre: " + this.nameGame.trim());
  }
}