import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.css']
})
export class OpeningsComponent implements OnInit {

  jobs = new Array;
  job = [];

  displayJobs:boolean;

  constructor(private globalService: DataService, private router:Router) { 
    // localStorage.clear();
  }

 ngOnInit() {
    this.getJobs();
    // console.log(this.jobs);
  }

  getJobs(){
     this.globalService.getServerJobs().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        if(res[i]['is_active']){
          this.jobs.push(res[i]);
        }
      }
     })
  }

  showJobs(job){
    console.log(job);
    this.job = job;
    this.displayJobs = true;
  }

  apply(job){

    

    this.router.navigate(['applicant-login-reg'],{state:{job_code:job.job_code, j_id:job._id}});

  }

}
