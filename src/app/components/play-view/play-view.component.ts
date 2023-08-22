import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent {
  colorsProposed:string[];
  proposedCombinations:number[] = new Array(10);//TODO refactorizar con los valores del modelo

  constructor(private router: Router){
    this.colorsProposed = ['O','O','O','O'];
  }
}
