import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin : boolean;

  forLogin : boolean;

  constructor(private globalService:DataService,private router:Router,private cookieService:CookieService) {
    if(localStorage.getItem('token')){
      if(!this.forLogin)
        this.forLogin = !this.forLogin;
      if(!this.isLogin)
        this.isLogin = !this.isLogin;
    }
    else{

    }
    if (this.globalService.subsVar==undefined) {    
      this.globalService.subsVar = this.globalService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        this.logoutNav();    
      });    
    }    
  }

  ngOnInit() {
    if(this.isLogin)
        console.log(typeof(this.forLogin));
   if(this.globalService.getLogin())
        console.log(typeof(this.isLogin));
        console.log(this.globalService.getLogin());
  }

  loginNav(){
    console.log(this.isLogin);
  }

  logoutNav(){
    this.forLogin = !this.forLogin;
    this.isLogin = !this.isLogin;
     console.log('emitted',this.isLogin);
  }

  login(){
    // this.forLogin = !this.forLogin;
    this.globalService.setLogin(this.forLogin);
    console.log(this.globalService.getLogin());
  }


  toggle(){
    this.isLogin = !this.isLogin;
    this.forLogin=!this.forLogin;
    console.log(this.cookieService.get('email'));
    
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  topNav(){
    if(!this.isLogin){
      this.forLogin = !this.forLogin;
    }
  }
}
