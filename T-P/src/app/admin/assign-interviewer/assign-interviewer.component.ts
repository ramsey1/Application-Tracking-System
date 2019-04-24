import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { CandidateDetailsComponent } from '../candidate-details/candidate-details.component';
import { Router } from '@angular/router';
import { slots } from '../slots';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-assign-interviewer',
  templateUrl: './assign-interviewer.component.html',
  styleUrls: ['./assign-interviewer.component.css']
})
export class AssignInterviewerComponent implements OnInit {

  constructor(private globalService : DataService,private router:Router,private cookieService:CookieService) { 
    if(this.cookieService.check('email')){
      this.adminInfo=this.cookieService.get('email');
    } 
    this.initializeForm();
  }

  tba : any;
  applicants :any;
  displayAssign : boolean;
  candidates=[];
  interviewers:any;
  j_id:any;
  next:any;
  jobCode:any;
  updateTBA:any;
  jobs:any;
  adminInfo:any;

  config = {displayKey: "", //if objects array passed which AGENCY_CODEkey to be displayed defaults to description
  search: true, //true/false for the search functionlity defaults to false,
  height: "250px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
  placeholder: "Select" // text to be displayed when no item is selected defaults to Select.
};

  mockData={"name":"","email":""};

  tb:{
    job_code: "string"
  };

  TBA =[];

  interviewSlots = slots;

  name =[];

  jobCodes=[];

  mockJobs = ["JRC123", "MEAN123"];

  date = "2019-03-01";
  time = "11:00-12:00 PM";
  mocEm = "vineet@gmail.com";
  

  assignInterviewer:FormGroup;

  ngOnInit() {
    
    this.getTBA();
    this.getCodes();
    this.getInterviewer();
    this.getApplicant();
    }

    getCodes(){
      this.globalService.getServerTBACodes().subscribe(res=>{
        console.log(res);
        
        for(var i=0;i<res.length;i++){
          this.jobCodes[i] = res[i].j_code;
        }
        console.log(this.jobCodes);
        
      })
    }

  getApplicant(){
    this.globalService.getSevrerApplicant().subscribe(res=>{
      this.applicants = res;
    });
  }

  getInterviewer(){
    this.globalService.getServerInterviewer().subscribe(res=>{
      this.interviewers = res;
      console.log('Interviewers ',this.interviewers);

      for(var i=0;i<this.interviewers.length;i++){
        for(var j=0;j<this.interviewers[i].isAvailable.length;j++){
          console.log(this.interviewers[i].isAvailable[j]);
        }
      }
      
    });

  }

  getTBA(){
    this.globalService.getServerTBA().subscribe(res=>{
      this.tba = res;
      console.log(this.tba);

      // for(var i=0;i<this.tba.length;i++){
      //   if(this.tba[i].is_assigned){
      //     this.tba.splice(i,1);
      //   }
      // }

      console.log(this.tba);
      
      
      this.uniqueTBA();
      console.log(this.TBA);
      
      
    })
  }

  

  initializeForm(){
    this.assignInterviewer = new FormGroup({
      interviewerName:new FormControl(''),
      candidateEmail:new FormControl('',[Validators.required]),
      candidateName:new FormControl(''),
      interviewerEmail:new FormControl('',[Validators.required]),
      date:new FormControl('',[Validators.required]),
      time:new FormControl('',[Validators.required]),
      feedback:new FormControl(''),
      status:new FormControl(''),
      i_id:new FormControl(''),
      c_id:new FormControl(''),
      j_id:new FormControl(''),
      j_code:new FormControl(''),
      level:new FormControl(''),
      adminInfo:new FormControl('')
    });
  }

  uniqueTBA(){
    this.TBA=this.tba.reduce((acc, x) =>
   acc.concat(acc.find(y => y.j_code === x.j_code) ? [] : [x])
 , []);

 console.log('redu');
  }

  showStatus(job){
    console.log(job);
    let jc = job.j_code;
    this.jobCode = jc;

    this.candidates =[];

    for(var i=0;i<this.tba.length;i++){
      if(this.tba[i].j_code==jc && !this.tba[i].is_assigned){        
       
        
        this.candidates.push(this.tba[i].c_email); 
        console.log(this.candidates);
        
      }
    }
    this.j_id = job.j_id;
    this.displayAssign = !this.displayAssign;
  }

  onSubmit(){

    this.assignInterviewer.get('level').setValue("Level 1");
    this.assignInterviewer.get('j_code').setValue(this.jobCode);
    this.assignInterviewer.get('j_id').setValue(this.j_id);
    this.assignInterviewer.get('adminInfo').setValue(this.adminInfo);

    console.log(this.assignInterviewer.value);

    console.log(this.assignInterviewer.value.date+this.assignInterviewer.value.time);
    
    
    for(var i=0;i<this.interviewers.length;i++){
      if(this.assignInterviewer.value.interviewerEmail == this.interviewers[i].email){
        for(var j=0;j<this.interviewers[i].isAvailable.length;j++){
        if(this.assignInterviewer.get('date').value+this.assignInterviewer.get('time').value == this.interviewers[i].isAvailable[j]){
          alert('Not Avialable Choose another time or date');
          return;
        }
      }
    }
  }    

    this.globalService.setServerAssigned(this.assignInterviewer.value).subscribe(res=>{
      console.log(res);
    });

    
    alert('assigned successfully');
    this.assignInterviewer.reset();
    // this.router.navigate(['admin-homepage/interview-status']);
    
  }

  selectionChanged(event){
    console.log(event);
    
  }

}
