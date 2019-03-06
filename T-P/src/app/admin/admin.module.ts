import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobsComponent } from './post-jobs/post-jobs.component';
import { AddInterviewerComponent } from './add-interviewer/add-interviewer.component';
import { AssignInterviewerComponent } from './assign-interviewer/assign-interviewer.component';
import { InterviewStatusComponent } from './interview-status/interview-status.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateJobsComponent } from './update-jobs/update-jobs.component';
import { SafePipe } from '../safe.pipe';
import { InterviewerDetailsComponent } from './interviewer-details/interviewer-details.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { SelectedCandidatesComponent } from './selected-candidates/selected-candidates.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PostJobsComponent, AddInterviewerComponent, AssignInterviewerComponent, InterviewStatusComponent, CandidateDetailsComponent, AdminHomepageComponent, UpdateJobsComponent,SafePipe, InterviewerDetailsComponent, JobDetailsComponent, SelectedCandidatesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,RouterModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    HttpClientModule
  ],
  exports:[PostJobsComponent, AddInterviewerComponent, AssignInterviewerComponent, InterviewStatusComponent, CandidateDetailsComponent,AdminHomepageComponent]
})
export class AdminModule { }
