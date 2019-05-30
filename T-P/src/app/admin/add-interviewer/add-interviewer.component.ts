import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { roles } from '../role-lists';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
 
const helper = new JwtHelperService();

@Component({
  selector: 'app-add-interviewer',
  templateUrl: './add-interviewer.component.html',
  styleUrls: ['./add-interviewer.component.css']
})
export class AddInterviewerComponent implements OnInit {

  constructor(private globalService : DataService,private router:Router,private toastr: ToastrService) { 
     this.token = localStorage.getItem('token');
     let dec = helper.decodeToken(this.token);
     this.adminInfo = dec.email;
    this.initializeform();
  }

  interviewRole = roles;

  interviewer:any;

  addInterviewer: FormGroup;

  adminInfo:any;

  token:any;

  initializeform() {
    this.addInterviewer = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]*$')
      ])),
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
      this.toastr.success('Added successfully');
      console.log(res);
    })

    let formData = this.initializeFormData();
  
    this.globalService.setServerRegister(formData).subscribe(res=>{
       console.log('reg');
      });

      // alert('Added Successfully');

    this.addInterviewer.reset();
    // this.router.navigate(['admin-homepage/interviewer-details']);
  }

  initializeFormData(){
    let formData = new FormData();
    formData.append('username',this.addInterviewer.get('name').value);
    formData.append('email',this.addInterviewer.get('email').value);
    formData.append('password',this.addInterviewer.get('password').value);
    formData.append('role','interviewer');

    return formData;
  }

 
}
