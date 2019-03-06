import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,ReactiveFormsModule,
    FormsModule
  ],
  exports:[FeedbackComponent]
})
export class InterviewerModule { }
