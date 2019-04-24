import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  email:any;
  displayStatus:boolean;
  accept:boolean;
  reject:boolean;

  user={
    email: "",
    jobCode:"",
    j_id:""
  };

  applicant= new Array;
  appliedFor=new Array;
  jobs=new Array;
  job=new Array;

  token:any;

  constructor(private globalService : DataService,private router:Router,private cookieService :CookieService) { 
  this.token = localStorage.getItem('token');
  let dec = helper.decodeToken(this.token);
  this.email = dec.email;
  }

  status = [];
  mock=[];


  ngOnInit() {
    this.user.email = this.email;
    this.getStatus(this.user);
    this.getApplicant(this.user);
    this.getJobs();
  }

  getStatus(user){
    this.globalService.getOneAssigned(user).subscribe(res=>{
      this.status = res;
      console.log(res);
      if(this.status.length>=0){
        this.displayStatus = !this.displayStatus;
      }
      if(res[res.length-1].status=='Accept'){
        this.accept = !this.accept
      }
      else if(res[res.length-1].status=='Reject'){
        this.reject = !this.reject;
      }
      // this.getSpecificApplicant(this.email,this.status)
      
    })

  }

  getApplicant(user){
    this.globalService.getOneApplicant(user).subscribe(res=>{
      this.applicant = res;
      console.log(res);      
      console.log(res.applyFor);
      for(var i=0;i<res.applyFor.length;i++){
        this.appliedFor.push(res.applyFor[i]);
      }
      console.log(this.appliedFor);
      this.setJob();
    });
  }

  getJobs(){
    this.globalService.getServerJobs().subscribe(res=>{
      this.jobs = res;
      console.log(this.jobs);
    })
  }

  setJob(){
    for(var i=0;i<this.appliedFor.length;i++){
      for(var j=0;j<this.jobs.length;j++){
        if(this.appliedFor[i].jobCode!=this.jobs[j].job_code){
          this.job.push(this.jobs[j]);
        }
      }
    }

    console.log(this.job);
    

  }

  getSpecificApplicant(email,assigned){
    for(var i=0;i<assigned.length;i++){
      if(assigned[i].c_email==email){
        this.mock.push(assigned[i]);
      }
    }
    console.log('mock',this.mock);
  }

  apply(job){
    // console.log(job);
    this.user.jobCode = job.job_code;
    this.user.j_id = job._id;
    // console.log(this.user);
    this.globalService.updateServerApplicant(this.user).subscribe(res=>{
      console.log(res);
      alert('applied successfully');
    })
    
  }

}
