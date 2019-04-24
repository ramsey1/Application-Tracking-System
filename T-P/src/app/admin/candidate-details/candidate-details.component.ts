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

vidSrc = '';
resSrc = '';
  
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
    this.resURL = 'http://localhost:3000/api/resume/';
    this.resURL = this.resURL + applicant.email;
    this.globalService.getResume(this.resURL).subscribe(res=>{
      saveAs(res,applicant.email+'.pdf');
      // this.resum = res;
      // this.displayResume = !this.displayResume;
    })
    this.resumeShow(applicant);
  }

  intro(applicant){
    this.vidURL = 'http://localhost:3000/api/video/'
    console.log(applicant);
    this.vidURL = this.vidURL+applicant.email;
    console.log(this.vidURL);
    this.globalService.getVideo(this.vidURL).subscribe(res=>{
      saveAs(res,applicant.email+'.mp4');
      console.log(res);
      // this.vid = res;
      // this.displayVideo = !this.displayVideo;
    });
    // this.displayVideo = !this.displayVideo;
    this.introShow(applicant);
  }

  introShow(candidate){
    this.displayVideo = false;
    this.vidSrc = 'http://localhost:3000/api/video/'
    console.log(candidate);
    this.vidSrc = this.vidSrc+candidate.email ;
    console.log(this.vidSrc);    
    this.displayVideo = true;
  }

  resumeShow(candidate){
    this.displayResume = false;
    this.resSrc = 'http://localhost:3000/api/resume/';
    this.resSrc = this.resSrc+candidate.email;
    console.log(this.resSrc);
    this.displayResume = true;
  }



}
