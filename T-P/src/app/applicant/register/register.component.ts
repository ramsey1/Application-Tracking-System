import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { highestGraduation } from '../highestGraduation';
import { phoneNumberValidator } from 'src/app/validators/phone-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  persInfo=true;

  education:boolean;

  employeeHistory:boolean;

  references:boolean;

  attachments:boolean;

  applicants:any;

  job_code:any;

  j_id:any;

  highestGraduation = highestGraduation;

  constructor(private globalService : DataService,private router:Router, private localService: RegisterService) { 
    this.inititializeForm();

    if(localStorage.getItem('jobCode')){
      this.job_code = localStorage.getItem('jobCode');
      this.j_id = localStorage.getItem('j_id');
    }
    
  }

  profileForm:FormGroup;

  ngOnInit() {

    console.log(this.localService.getApplicants());
    this.localService.setApplicants();
    console.log(this.localService.getApplicants());
    
    this.getApplicants();
  }

  getApplicants(){
    this.globalService.getSevrerApplicant().subscribe(res=>{
      this.applicants = res;
        });
  }


  inititializeForm(){
    this.profileForm = new FormGroup({
      fullName:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required),
      zip:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      mobile:new FormControl('',[Validators.required,phoneNumberValidator]),
      highSchool:new FormControl('',Validators.required),
      cgpa:new FormControl('',Validators.required),
      xii:new FormControl('',Validators.required),
      perc:new FormControl('',Validators.required),
      hgd:new FormControl('',Validators.required),
      gdate:new FormControl('',Validators.required),
      certifications:new FormControl(''),
      skills:new FormControl('',Validators.required),
      experience:new FormGroup({
      year:new FormControl('',[Validators.required]),
      month:new FormControl('',[Validators.required]),
      }),
      employer:new FormControl(''),
      empadd:new FormControl(''),
      Eemail:new FormControl('',[Validators.email]),
      Ephone:new FormControl(''),
      supervisor:new FormControl(''),
      jtitle:new FormControl(''),
      salary:new FormControl(''),
      ehdate:new FormControl(''),
      rfl:new FormControl(''),
      refname:new FormControl('',Validators.required),
      refjob:new FormControl('',Validators.required),
      refcomp:new FormControl('',Validators.required),
      refphone:new FormControl('',Validators.required),
      refemail:new FormControl('',[Validators.required,Validators.email]),
      resFile:new FormControl(''),
      vidFile:new FormControl(''),
      jobCode:new FormControl(''),
      j_id:new FormControl(''),
      isVerified : new FormControl('')
    });
  }

  videoFileInput(event) {
    if(event.target.files.length<0){
      return;
    }
    let file = event.target.files[0];
    this.profileForm.get('vidFile').setValue(file);
  }
  
  resumeFileInput(event) {
    if(event.target.files.length<0){
      return;
    }
    let file = event.target.files[0];
    this.profileForm.get('resFile').setValue(file);
  }
  

  onReg(){
    this.profileForm.get('j_id').setValue(this.j_id);
    this.profileForm.get('jobCode').setValue(this.job_code);
    console.log(this.profileForm.value);

    let formData = this.initializeFormData();

    this.globalService.setServerApplicant(formData).subscribe(res=>{
      console.log(res);
    });

    this.router.navigate(['applicant-verification'],{state:{'mob':this.profileForm.value.mobile,'email':this.profileForm.value.email}});

    this.profileForm.reset();
  }



  initializeFormData(){
    let formData= new FormData();
    formData.append('resFile', this.profileForm.get('resFile').value);
    formData.append('vidFile', this.profileForm.get('vidFile').value);
  
    formData.append('fullName', this.profileForm.get('fullName').value);
    formData.append('address', this.profileForm.get('address').value);
    formData.append('city', this.profileForm.get('city').value);
    formData.append('state', this.profileForm.get('state').value);
    formData.append('zip', this.profileForm.get('zip').value);
    formData.append('email', this.profileForm.get('email').value);
    formData.append('mobile', this.profileForm.get('mobile').value);
    formData.append('highSchool', this.profileForm.get('highSchool').value);
    formData.append('cgpa', this.profileForm.get('cgpa').value);
    formData.append('xii', this.profileForm.get('xii').value);
    formData.append('perc', this.profileForm.get('perc').value);
    formData.append('hgd', this.profileForm.get('hgd').value);
    formData.append('gdate', this.profileForm.get('gdate').value);
    formData.append('skills', this.profileForm.get('skills').value);
    formData.append('certifications', this.profileForm.get('certifications').value);
    formData.append('jobCode', this.profileForm.get('jobCode').value);
    formData.append('j_id', this.profileForm.get('j_id').value);
    formData.append('refname', this.profileForm.get('refname').value);
    formData.append('refjob', this.profileForm.get('refjob').value);
    formData.append('refcomp', this.profileForm.get('refcomp').value);
    formData.append('refemail', this.profileForm.get('refemail').value);
    formData.append('refphone', this.profileForm.get('refphone').value);
    formData.append('employer', this.profileForm.get('employer').value);
    formData.append('empadd', this.profileForm.get('empadd').value);
    formData.append('Eemail', this.profileForm.get('Eemail').value);
    formData.append('Ephone', this.profileForm.get('Ephone').value);
    formData.append('supervisor', this.profileForm.get('supervisor').value);
    formData.append('jtitle', this.profileForm.get('jtitle').value);
    formData.append('salary', this.profileForm.get('salary').value);
    formData.append('rfl', this.profileForm.get('rfl').value);

    formData.append('ehdate', this.profileForm.get('ehdate').value);
    formData.append('year', this.profileForm.get('experience').get('year').value);
    formData.append('month', this.profileForm.get('experience').get('month').value);

    return formData;
  }


}
