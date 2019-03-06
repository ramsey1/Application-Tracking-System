import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningsComponent } from './openings/openings.component';

@NgModule({
  declarations: [OpeningsComponent],
  imports: [
    CommonModule
  ],
  exports:[OpeningsComponent]
})
export class JobsModule { }
