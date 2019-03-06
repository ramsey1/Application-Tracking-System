import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  constructor(private globalService:DataService) { }

  textShow:boolean;
  tba=new Array;
  assigned=new Array;
  applicants=new Array;
  progress:boolean;

  perc=0;

  accepted=0;

  ngOnInit() {
if(window.location.href=='http://localhost:4200/admin-homepage'){
    if(this.progress){
      this.progress=!this.progress;
    }
    console.log(window.location.href);
  }

    
    this.openNav();
    this.getTBA();
    this.getAssigned();
    this.getApplicant();
  }


  openNav(){
    document.getElementById("mySidenav").style.width = "230px";
    this.textShow=true;
  }

  closeNav(){
    document.getElementById("mySidenav").style.width = "0px";
    this.textShow=false;
  }

  getTBA(){
    this.globalService.getServerTBA().subscribe(res=>{
      this.tba = res;
    });

  }

  getAssigned(){
    this.globalService.getServerAssigned().subscribe(res=>{
      this.assigned = res;
      for(var i=0;i<res.length;i++){
        if(res[i].status=='Accept'){
          this.accepted+=1;
        }
      }
      // console.log(res.length);
      // console.log(this.accepted);
      // console.log(this.accepted/res.length*100);
      
      // this.perc = this.accepted/res.length*100;
      console.log(this.perc);
    });
    
    

  }

  getApplicant(){
    this.globalService.getSevrerApplicant().subscribe(res=>{
      this.applicants= res;
    })
  }

  toggle(){
    if(!this.progress)
    this.progress = !this.progress;
  }

}
