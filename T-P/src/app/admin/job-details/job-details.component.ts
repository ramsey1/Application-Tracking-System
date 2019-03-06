import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobs= new Array;

  constructor(private globalService:DataService) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs(){
    this.globalService.getServerJobs().subscribe(res=>{
      this.jobs = res;
    })
  }

  remove(job){
    console.log(job);
    this.globalService.sofDeleteJobs(job).subscribe(res=>{
      console.log(res);
    })
    
  }

}
