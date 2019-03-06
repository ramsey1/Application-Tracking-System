import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { highestGraduation } from '../../applicant/highestGraduation';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent implements OnInit {

  constructor(private globalService :DataService,private router:Router,private cookieService:CookieService) {
    if(this.cookieService.check('email')){
      this.adminInfo=this.cookieService.get('email');
    } 
    this.initializeForm();
   }

  postJobs: FormGroup;

  jobs : any;

  highestGraduation = highestGraduation;

  adminInfo:any;

  enroll = ['Full Time','Part Time','Internship'];

   ngOnInit() {
    this.getJobs();
  }

  getJobs(){
    this.globalService.getServerJobs().subscribe(res=>{
      this.jobs = res;
    })

  }

  initializeForm(){
    this.postJobs = new FormGroup({
      jobCode: new FormControl('',Validators.required),
      jobProfile: new FormControl('',Validators.required),
      vacancies: new FormControl('',Validators.required),
      baseSal: new FormControl('',Validators.required),
      enrollType: new FormControl('',Validators.required),
      jobLoc: new FormControl('',Validators.required),
      jobDesc: new FormControl('',Validators.required),
      eductReq: new FormControl('',Validators.required),
      skillsReq: new FormControl('',Validators.required),
      expReq:new FormControl('',Validators.required),
      priority:new FormControl(''),
      adminInfo:new FormControl('')
    });
  }

  onSubmit(){
    if(this.postJobs.get('priority').value==""){
      this.postJobs.get('priority').setValue(false);
    }

    this.postJobs.get('adminInfo').setValue(this.adminInfo);
    
    console.log(this.postJobs.value);
    this.globalService.setServerJobs(this.postJobs.value).subscribe(res=>{
      console.log(res);
    });

    this.postJobs.reset();
    alert('Posted SucessFully');
    // this.router.navigate(['admin-homepage/job-details'])
  }
}
