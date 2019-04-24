import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {

  displayLogin:boolean;
  displayRegister:boolean;

  loginForm:FormGroup;
  registerForm:FormGroup;

  j_id:any;
  job_code:any;
  
  constructor(private router:Router,private globalService: DataService) { 
    if(localStorage.getItem('jobCode')){
      this.job_code = localStorage.getItem('jobCode');
      this.j_id = localStorage.getItem('j_id');
    }
    else{
    this.job_code = this.router.getCurrentNavigation().extras.state.job_code;
      this.j_id = this.router.getCurrentNavigation().extras.state.j_id;
    localStorage.setItem('jobCode',this.job_code);
    localStorage.setItem('j_id',this.j_id);
    }

    this.initializeForm();
  }

  ngOnInit() {
  }

  initializeForm(){

    this.registerForm= new FormGroup({
      username:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]*$')
      ])),
      email:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
      ])),
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      role:new FormControl('')
    });
  }

  showLogin(){
    this.displayLogin = !this.displayLogin;
    this.displayRegister = !this.displayRegister;
  }

  showRegister(){
    this.displayLogin = !this.displayLogin;
    this.displayRegister = !this.displayRegister;
  }

  loginSubmit(){

    console.log(this.loginForm.value);


    this.globalService.login(this.loginForm.value).subscribe(res=>{
      if(res.role=='applicant'){
        this.router.navigate(['applicant-register'])
      }
      else{
        alert('not registered');
      }
    })

  }

  registerSubmit(){

    this.registerForm.get('role').setValue('applicant');
    console.log(this.registerForm.value);

   
 this.globalService.setServerRegister(this.registerForm.value).subscribe(res=>{
      console.log(res);
      
    });
  
    this.router.navigate(['applicant-register'])
  }



}
