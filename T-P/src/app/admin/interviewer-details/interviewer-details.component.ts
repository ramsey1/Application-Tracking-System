import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-interviewer-details',
  templateUrl: './interviewer-details.component.html',
  styleUrls: ['./interviewer-details.component.css']
})
export class InterviewerDetailsComponent implements OnInit {

  interviewers=new Array;

  constructor(private globalService:DataService) { }

  ngOnInit() {
    this.getInterviewers();
  }

  getInterviewers(){
    this.globalService.getServerInterviewer().subscribe(res=>{
      this.interviewers = res;
    })
  }

  remove(interviewer){
    console.log(interviewer);
    this.globalService.softDeleteInterviewer(interviewer).subscribe(res=>{
      console.log(res);
      
    })
    
  }

}
