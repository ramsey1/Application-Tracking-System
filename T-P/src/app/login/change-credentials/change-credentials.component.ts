import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent implements OnInit {

  updateForm:FormGroup;

  constructor(private globalService:DataService,private router:Router) { 
    this.initializeForm();
    this.updateForm.get('email').setValue(localStorage.getItem('email'));
  }

  ngOnInit() {
  }

  initializeForm(){
    this.updateForm = new FormGroup({
      email:new FormControl('',Validators.email),
      password:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    this.globalService.updateServerPassword(this.updateForm.value).subscribe(res=>{
      console.log('Updtaed');
    });

    this.router.navigate(['login']);
    
  }

}
