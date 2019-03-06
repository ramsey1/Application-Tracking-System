import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-jobs',
  templateUrl: './update-jobs.component.html',
  styleUrls: ['./update-jobs.component.css']
})
export class UpdateJobsComponent implements OnInit {

  jobs = [];
  displayForm: boolean;
  updateJobs:FormGroup;
  displayTable:boolean;

  constructor(private globalService : DataService) { 
    this.initializeForm();
  }

  ngOnInit() {
    this.getJobs();
  }

  initializeForm(){
    this.updateJobs = new FormGroup({
     jobCode:new FormControl(''),
     baseSal:new FormControl(''),
     location:new FormControl(''),
     vacancies:new FormControl(''),
     priority:new FormControl(''),
     j_id:new FormControl('')

    })

  }

  getJobs(){
    this.globalService.getServerJobs().subscribe(res=>{
      this.jobs = res;
    })
  }

  updateJob(job){
    this.updateJobs.get('j_id').setValue(job._id);
    this.displayTable = !this.displayTable;
    this.displayForm = !this.displayForm;

    console.log(this.displayForm);
    console.log(job);
    
  }

  onSubmit(){

    let formData = this.initializeFormData();

    console.log(formData);
    
    console.log(this.updateJobs.value);
    this.displayTable = !this.displayTable;
    this.displayForm = !this.displayForm;
    this.globalService.updateServerJobs(formData).subscribe(res=>{
      console.log(res);
      
    })

  }

  initializeFormData(){
    let formData = new FormData();

    formData.append('j_id',this.updateJobs.get('j_id').value);

    if(this.updateJobs.get('jobCode').value){
      formData.append('jobCode',this.updateJobs.get('jobCode').value);
    }

    if(this.updateJobs.get('baseSal').value){
      formData.append('baseSal',this.updateJobs.get('baseSal').value);
    }

    if(this.updateJobs.get('location').value){
      formData.append('location',this.updateJobs.get('location').value);
    }

    if(this.updateJobs.get('vacancies').value){
    
      
      formData.append('vacancies',this.updateJobs.get('vacancies').value);
    }

    if(this.updateJobs.get('priority').value){
      formData.append('priority',this.updateJobs.get('priority').value);
    }

  }

}
