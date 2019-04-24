import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  logout:boolean;

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;

  jobsVar:Subscription;
  invokeJob = new EventEmitter();

  
  interviewerURL = 'http://localhost:3000/api/interviewer';
  jobsURL = 'http://localhost:3000/api/jobs';
  applicantURL = 'http://localhost:3000/api/applicant';
  loginURL = 'http://localhost:3000/api/login';
  tbaURL = 'http://localhost:3000/api/to_be_assigned';
  assignedURL = 'http://localhost:3000/api/assigned';
  registerURL = 'http://localhost:3000/api/register';
  resumeURL = 'http://localhost:3000/api/resume';
  videoURL = 'http://localhost:3000/api/video';
  verifyingURL = 'http://localhost:3000/api/verification';
  updatePasswordURL = 'http://localhost:3000/api/updatePassword';

  constructor(private http: HttpClient) { }

  setServerRegister(user):Observable<any>{
    return this.http.post<any>(this.registerURL,user);
  }

  getServerInterviewer() :Observable<any>{
    return this.http.get<any>(this.interviewerURL);
  }

  setServerInterviewer(interviewer): Observable<any>{
    return this.http.post<any>(this.interviewerURL,interviewer);
  }

   getInterviewer() {
   this.getServerInterviewer().subscribe(res=>{
     return res;
   })
  }

  softDeleteInterviewer(interviewer):Observable<any>{
    return this.http.post<any>(this.interviewerURL+'/'+interviewer._id,interviewer);
  }

  
  getServerJobs() :Observable<Object[]>{
    return this.http.get<Object[]>(this.jobsURL);
  }

  getSpecificJobs(j_id):Observable<any>{
  return this.http.get<any>(this.jobsURL+'/'+j_id);
  }

  setServerJobs(jobs): Observable<any>{
    return this.http.post<any>(this.jobsURL,jobs);
  }

  updateServerJobs(job):Observable<any>{
    return this.http.put<any>(this.jobsURL,job);
    }

    getJobs(){
      this.getServerJobs().subscribe(res=>{
        return res;
      });
    }

    sofDeleteJobs(job):Observable<any>{
      return this.http.put<any>(this.jobsURL+'/'+job._id,job);
    }

  getSevrerApplicant(): Observable<any>{
    return this.http.get<any>(this.applicantURL);
  }

  getOneApplicant(user): Observable<any>{
    return this.http.post<any>(this.applicantURL+'/'+user.email,user);
  }

  setServerApplicant(applicant): Observable<any>{
    return this.http.post<any>(this.applicantURL,applicant);
  }

  updateServerApplicant(user):Observable<any>{
    return this.http.put<any>(this.applicantURL,user);
  }

  getApplicant(){
    this.getSevrerApplicant().subscribe(res=>{
      return res;
    })
  }

  getServerTBA():Observable<any>{
    return this.http.get(this.tbaURL);
  }

  getServerTBACodes():Observable<any>{
    return this.http.get<any>(this.tbaURL+'/codes');
  }

  setServerTBA(tba): Observable<any>{
   return this.http.post<any>(this.tbaURL, tba);
  }

  updateServerTBA(tba):Observable<any>{
    return this.http.put<any>(this.tbaURL+'/'+tba.c_email,tba);
  }

  getTBA(){
    this.getServerTBA().subscribe(res=>{
      return res;
    })
  }

  getServerAssigned(): Observable<any>{
    return this.http.get<any>(this.assignedURL);
  }

  getOneAssigned(user):Observable<any>{
    return this.http.post<any>(this.assignedURL+'/'+user.email,user);
  }

  setServerAssigned(assigned): Observable<any>{
    return this.http.post<any>(this.assignedURL,assigned);
  }

  updateServerAssigned(assigned): Observable<any>{
    return this.http.put<any>(this.assignedURL+'/'+assigned._id,assigned);
  }

  getAssigned(){
    this.getServerAssigned().subscribe(res=>{
      return res;
    })
   }


  onFirstComponentButtonClick() {    
    this.invokeFirstComponentFunction.emit();    
  }

  onJobPost(){
    this.invokeJob.emit();
  }

  login(data):Observable<any>{
    return this.http.post<any>(this.loginURL,data);
  }

  getResume(file):Observable<Blob>{
    return this.http.get(file,{ responseType: 'blob' });
  }

  getVideo(file:string):Observable<Blob>{
    return this.http.get(file, { responseType: 'blob' });
  }

  getVerification(user):Observable<any>{
    return this.http.get<any>(this.verifyingURL+'/'+user.email);
  }

  getServerVerification(user){
    this.getVerification(user).subscribe(res=>{
      return res;
    })
  }

  updateServerPassword(user):Observable<any>{
    return this.http.put<any>(this.updatePasswordURL,user);
  }
  
  setLogin(log){
    this.logout = log;
  }

  getLogin(){
    return this.logout;
  }
}
