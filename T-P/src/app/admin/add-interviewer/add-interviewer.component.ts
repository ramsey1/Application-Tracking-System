import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { roles } from '../role-lists';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-interviewer',
  templateUrl: './add-interviewer.component.html',
  styleUrls: ['./add-interviewer.component.css']
})
export class AddInterviewerComponent implements OnInit {

  constructor(private globalService : DataService,private router:Router,private cookieService:CookieService,private toastr: ToastrService) { 
    if(this.cookieService.check('email')){
      this.adminInfo=this.cookieService.get('email');
    } 
    this.initializeform();
  }

  interviewRole = roles;

  interviewer:any;

  addInterviewer: FormGroup;

  adminInfo:any;

  initializeform() {
    this.addInterviewer = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', [Validators.required]),
      adminInfo:new FormControl('')
    });
  }

  ngOnInit() {
    // console.log(this.adminInfo);
    
    this.getInterviewer();  
  }

  getInterviewer(){
    this.globalService.getServerInterviewer().subscribe(res=>{
      this.interviewer = res;
    });
  }

  onSubmit(){
    this.addInterviewer.get('adminInfo').setValue(this.adminInfo);
    console.log(this.addInterviewer.value);
    this.globalService.setServerInterviewer(this.addInterviewer.value).subscribe(res=>{
      console.log(res);
    })

    // this.addInterviewer.value.role = 'interviewer';
    this.addInterviewer.get('role').setValue('interviewer');

    console.log('register',this.addInterviewer.value);
  
    this.globalService.setServerRegister(this.addInterviewer.value).subscribe(res=>{
        console.log(res);
      });

    this.addInterviewer.reset();
    this.router.navigate(['admin-homepage/interviewer-details']);
  }

  success(){
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}
