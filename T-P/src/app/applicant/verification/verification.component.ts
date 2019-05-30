import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  verification:any;
  verificationForm: FormGroup;

  job:any;

  mob: any;
  email: any;
  jobCode:any;
  j_id:any;

  user={
    email:"",
    token:""
  };

  constructor(private route: Router,private globalService : DataService,private toastr:ToastrService) {
    if (localStorage.getItem('vmob')) {
      this.mob = localStorage.getItem('vmob');
      this.email = localStorage.getItem('email');
    }
    else {
      this.mob = this.route.getCurrentNavigation().extras.state.mob;
      this.email = this.route.getCurrentNavigation().extras.state.email;
      console.log(this.email);
      
      localStorage.setItem('vmob', this.mob);
      localStorage.setItem('email', this.email);
    }
    this.initializeForm();
  }

  ngOnInit() {
    this.user.email = this.email;
    this.jobCode = localStorage.getItem('jobCode');
    this.j_id = localStorage.getItem('j_id');
    // this.getOTP();
    this.getJob();

  }

  initializeForm() {
    this.verificationForm = new FormGroup({
      otp: new FormControl('', Validators.required)
    });
  }

  getOTP(){
    this.globalService.getVerification(this.user).subscribe(res=>{
      this.verification = res;
      console.log(res);
      
      console.log(this.verification);
    });
  }

  getJob(){
    this.globalService.getSpecificJobs(this.j_id).subscribe(res=>{
      this.job = res;
      console.log(res);
    })
  }


  onSubmit() {
    this.user.token = this.verificationForm.get('otp').value;

    this.globalService.verifyApplicant(this.user).subscribe(res=>{
      if(res.msg == 'success'){
        // console.log(this.verificationForm.get('otp').value==this.verification.token);

        this.job.aplied_cnt = this.job.aplied_cnt + 1;
    
        this.globalService.updateServerJobs(this.job).subscribe(res=>{
          console.log(res);
        })
    
        localStorage.removeItem('vmob');
        localStorage.removeItem('email');
        localStorage.removeItem('jobCode');
        localStorage.removeItem('j_id');
    
        // alert('Verified Succesfully');
        this.toastr.success('Verified Sucessfully');
    
        this.route.navigate(['']);
      }
      else{
        // alert('Wrong OTP');
        this.toastr.error("Wrong OTP");
        this.verificationForm.reset();
        return;
      }
    })

    // if(this.verificationForm.get('otp').value!=this.verification.token){
    //   alert('Wrong OTP');
    //   this.verificationForm.reset();
    //   return;
    // }

    // console.log(this.verificationForm.get('otp').value==this.verification.token);

    // this.job.aplied_cnt = this.job.aplied_cnt + 1;

    // this.globalService.updateServerJobs(this.job).subscribe(res=>{
    //   console.log(res);
    // })

    // localStorage.removeItem('vmob');
    // localStorage.removeItem('email');
    // localStorage.removeItem('jobCode');
    // localStorage.removeItem('j_id');

    // alert('Verified Succesfully');

    // this.route.navigate(['']);
  }

}
