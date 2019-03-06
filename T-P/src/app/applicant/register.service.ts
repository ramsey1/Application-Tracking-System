import { Injectable } from '@angular/core';

 var ret = true;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  applicant = new Array();



  constructor() { }

  getApplicants(){
    // return this.applicant;
    return ret;

  }

  setApplicants(){
    // this.applicant = applicant;
    ret = false;
  }

}
