import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { EventEmitterServices } from 'src/app/service/evnet-emitter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobs= new Array;

  constructor(private globalService:DataService,private emittService:EventEmitterServices,private toastr: ToastrService) {
    if (this.emittService.subsVar==undefined) {    
      this.emittService.subsVar = this.emittService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        this.getJobs();    
      });    
    }    
    
  }

  ngOnInit() {
   

    this.getJobs();
  }

  getJobs(){
    // this.globalService.getServerJobs().subscribe(res=>{
    //   this.jobs = res;
    //   console.log("Jobs::::::::::::",this.jobs);
      
    // })
    this.globalService.getAllJobs().subscribe(res=>{
      this.jobs = res;
      console.log("Jobs::::::::::::",this.jobs);
    })
  }

  remove(job){
    job.is_active = false;
    
    console.log(job);
    this.globalService.sofDeleteJobs(job).subscribe(res=>{
      this.toastr.warning('Removed');
      console.log(res);
    }) 
  }

  add(job){
    job.is_active = true;
    console.log(job);
    this.globalService.sofDeleteJobs(job).subscribe(res=>{
        this.toastr.success('Job added');
            console.log(res);
    })
  }

  check(){
    console.log('job working');
  }

}
