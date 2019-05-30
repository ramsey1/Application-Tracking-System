import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [FeedbackComponent, SafePipe],
  imports: [
    CommonModule,ReactiveFormsModule,
    FormsModule
  ],
  exports:[FeedbackComponent]
})
export class InterviewerModule { }
