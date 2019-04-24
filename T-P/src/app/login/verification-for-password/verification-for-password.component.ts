import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-for-password',
  templateUrl: './verification-for-password.component.html',
  styleUrls: ['./verification-for-password.component.css']
})
export class VerificationForPasswordComponent implements OnInit {
  verificationForm:FormGroup;
  email:any;
  forEmail = true;

  constructor(private router:Router) { 
    this.initializeForm();
  }

  ngOnInit() {
    console.log('hi');
    
  }

  initializeForm(){
    this.verificationForm = new FormGroup({
      email:new FormControl('',[Validators.email,Validators.required]),
      code:new FormControl('',Validators.required)
    });
  }

  onVerify(){
    localStorage.setItem('email',this.verificationForm.get('email').value);
    this.forEmail = !this.forEmail;
  }

  onSubmit(){
    console.log(this.verificationForm.get('code').value==9000);
    
    if(this.verificationForm.get('code').value==9000){
      this.router.navigate(['change-password']);
    }
  }
}
