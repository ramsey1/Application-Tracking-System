import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpeningsComponent } from './jobs/openings/openings.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { PostJobsComponent } from './admin/post-jobs/post-jobs.component';
import { AddInterviewerComponent } from './admin/add-interviewer/add-interviewer.component';
import { AssignInterviewerComponent } from './admin/assign-interviewer/assign-interviewer.component';
import { InterviewStatusComponent } from './admin/interview-status/interview-status.component';
import { CandidateDetailsComponent } from './admin/candidate-details/candidate-details.component';
import { PortalLoginComponent } from './login/portal-login/portal-login.component';
import { RegisterComponent } from './applicant/register/register.component';
import { StatusComponent } from './applicant/status/status.component';
import { FeedbackComponent } from './interviewer/feedback/feedback.component';
import { VerificationComponent } from './applicant/verification/verification.component';
import { UpdateJobsComponent } from './admin/update-jobs/update-jobs.component';
import { LoginRegComponent } from './applicant/login-reg/login-reg.component';
import { InterviewerDetailsComponent } from './admin/interviewer-details/interviewer-details.component';
import { JobDetailsComponent } from './admin/job-details/job-details.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
import { SelectedCandidatesComponent } from './admin/selected-candidates/selected-candidates.component';

import { ChangeCredentialsComponent } from './login/change-credentials/change-credentials.component';
import { VerificationForPasswordComponent } from './login/verification-for-password/verification-for-password.component';


const routes: Routes = [
  {path:'',component: OpeningsComponent},
  {path:'admin-homepage', component: AdminHomepageComponent, canActivate: [AuthGuard] , children:[
    {path:'post-jobs', component: PostJobsComponent},
    {path:'add-interviewer',component: AddInterviewerComponent},
    {path:'assign-interviewer',component: AssignInterviewerComponent},
    {path:'interview-status',component: InterviewStatusComponent},
    {path:'candidate-details', component: CandidateDetailsComponent},
    {path:'update-jobs', component: UpdateJobsComponent},
    {path:'interviewer-details',component: InterviewerDetailsComponent},
    {path:'job-details',component:JobDetailsComponent},
    {path:'complete-applicants',component:SelectedCandidatesComponent}
  ]},
  {path:'login', component: PortalLoginComponent },
  {path:'password-verification',component:VerificationForPasswordComponent},
  {path:'change-password',component:ChangeCredentialsComponent},
  {path:'logout', component:PortalLoginComponent},
  {path:'applicant-register', component: RegisterComponent},
  {path:'applicant-status',canActivate: [AuthGuard] ,component: StatusComponent},
  {path:'interviewer-homepage', canActivate: [AuthGuard],component: FeedbackComponent},
  {path: 'applicant-verification',component: VerificationComponent},
  {path: 'applicant-login-reg',component:LoginRegComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
