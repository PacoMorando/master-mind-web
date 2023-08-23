import { Component } from '@angular/core';
import { ColorPicker } from './color-picker';
import { MastermindSessionService } from 'src/app/services/mastermind-session.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-combination-picker',
  templateUrl: './combination-picker.component.html',
  styleUrls: ['./combination-picker.component.css']
})
export class CombinationPickerComponent {
  protected colorPickers: ColorPicker[] = [
    new ColorPicker(),
    new ColorPicker(),
    new ColorPicker(),
    new ColorPicker()
  ]

  constructor(private mastermindService: MastermindSessionService) {
  }

  protected addProposedCombination() {
    this.mastermindService.addProposedCombination(this.getProposedCombination());
    console.log(this.getProposedCombination());
  }
 
  private getProposedCombination(): string {
    let proposedCombination: string = "";
    for (const ColorPicker of this.colorPickers ) {
      proposedCombination += ColorPicker.getColorSelected();
    }
    return proposedCombination;
  }

  protected previousColor(colorPicker: ColorPicker) {
    colorPicker.previousColor();
  }

  protected nextColor(colorPicker: ColorPicker) {
    colorPicker.nextColor();
  }

}