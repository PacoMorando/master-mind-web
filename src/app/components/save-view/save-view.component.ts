import { Component, OnInit } from '@angular/core';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-save-view',
  templateUrl: './save-view.component.html',
  styleUrls: ['./save-view.component.css']
})
export class SaveViewComponent implements OnInit{
  protected nameGame: string = "";
  protected isNameEmpty: boolean = false;
  protected isNameExist: boolean = false;

  constructor(private saveService: SaveService) { }

  ngOnInit(): void {
    console.log("INIT SAVE VIEW");
    this.saveService.updateGame();
  }

  protected saveGame() {
    this.isNameEmpty = this.nameGame.trim() === "";
    this.isNameExist = false;
    if (this.isNameEmpty == false) {
      this.saveService.exist(this.nameGame).subscribe(() => {
        if (this.saveService.isNameExist == true) {
          this.isNameExist = true;
          console.log("El nombre ya existe");
        } else {
          this.saveService.saveGame(this.nameGame);
        }
      });
    }
  }

  protected cancel() {
    this.saveService.cancel();
  }
}