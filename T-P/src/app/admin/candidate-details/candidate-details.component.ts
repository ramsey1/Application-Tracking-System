import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
applicants= [];

vid :any;
resum:any;
displayVideo:boolean;
displayResume:boolean;

vidURL='http://localhost:3000/api/video/';
resURL = 'http://localhost:3000/api/resume/';
  
  constructor(private globalService:DataService) { }


   ngOnInit() {
     this.getApplicants();

  }

  getApplicants(){
    this.globalService.getSevrerApplicant().subscribe(res=>{
      this.applicants = res;
    })

  }

  resume(applicant){
    this.resURL = this.resURL + applicant.email;
    this.globalService.getResume(this.resURL).subscribe(res=>{
      saveAs(res,applicant.email+'.pdf');
      // this.resum = res;
      // this.displayResume = !this.displayResume;
    })
  }

  intro(applicant){
    console.log(applicant);

    this.vidURL = this.vidURL+applicant.email;

    console.log(this.vidURL);
    
    
    this.globalService.getVideo(this.vidURL).subscribe(res=>{
      saveAs(res,applicant.email+'.mp4');
      console.log(res);
      
      // this.vid = res;

      // this.displayVideo = !this.displayVideo;
    })
    // this.displayVideo = !this.displayVideo;
  
  }



}
