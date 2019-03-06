import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-selected-candidates',
  templateUrl: './selected-candidates.component.html',
  styleUrls: ['./selected-candidates.component.css']
})
export class SelectedCandidatesComponent implements OnInit {

  assigned= new Array;
  complete= new Array;
  displayTable :boolean;

  constructor(private globalService:DataService) { }

  ngOnInit() {
    if(this.displayTable){
      this.displayTable = true;
    }
    this.getAssigned();
  }

  getAssigned(){
    this.globalService.getServerAssigned().subscribe(res=>{
      this.assigned = res;
      console.log(res);
      
      this.getComplete();
    })

  }

  getComplete(){
    for(var i=0;i<this.assigned.length;i++){
     
      
      if(this.assigned[i].status=='Accept'){
        this.complete.push(this.assigned[i]);
      }
      else if(this.assigned[i].status=='Reject'){
        this.complete.push(this.assigned[i]);
      }
    }

    if(this.complete.length>=0){
      this.displayTable = !this.displayTable;
      console.log(this.displayTable);
      
    }
  }

}
