import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { JwtHelperService } from '@auth0/angular-jwt';
 

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  interviewerName:any;

  i_email:any;

  assigned:any;

  interviewers:any;

  resList=[];

  update:boolean;

  token:any;

   helper = new JwtHelperService();

  vidURL='http://localhost:3000/api/video/';
  resURL = 'http://localhost:3000/api/resume/';

  constructor(private globalService : DataService,private router:Router) { 
 
  this.token= localStorage.getItem('token');
  let dec = this.helper.decodeToken(this.token);
 
  this.i_email = dec.email;
   }

   ngOnInit() {
        this.getAssigned();
        this.getInterviewer();
  }

  getAssigned(){
    this.globalService.getServerAssigned().subscribe(res=>{
      this.assigned=res;
      console.log('assigned',res);
    });
  }

  getInterviewer(){
    this.globalService.getServerInterviewer().subscribe(res=>{
      this.interviewers = res;
      console.log('inter',res);
      for(var i=0;i<this.interviewers.length;i++){
        if(this.i_email==this.interviewers[i].email){
          this.interviewerName = this.interviewers[i].name;
        }
      }
  
      this.getList();
    })
  }

  getList(){
    for(var i=0;i<this.assigned.length;i++){
      if(this.i_email==this.assigned[i].i_email){
        this.resList.push(this.assigned[i]);
      }
    }
    console.log(this.resList);
  }

  feedback(mapped){
    console.log(mapped);
    this.globalService.updateServerAssigned(mapped).subscribe(res=>{
      console.log(res);
    });
    this.update = !this.update;
  }

  resume(applicant){
    this.resURL = this.resURL + applicant.c_email;
    this.globalService.getResume(this.resURL).subscribe(res=>{
      saveAs(res,applicant.c_email+'.pdf');
    })
  }

  intro(applicant){
    console.log(applicant);

    this.vidURL = this.vidURL+applicant.c_email;
    console.log(this.vidURL);
    this.globalService.getVideo(this.vidURL).subscribe(res=>{
      saveAs(res,applicant.c_email+'.mp4');
      console.log(res);
    })
  }

  toggle(){
    this.update = !this.update;
  }
  }


