import { Component } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.css']
})
export class ResumeViewComponent {

  constructor(private resumeService: ResumeService){
    
  }

  protected continue(){
    this.resumeService.continue();
  }
}
