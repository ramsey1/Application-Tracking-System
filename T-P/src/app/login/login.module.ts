import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLoginComponent } from './portal-login/portal-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [PortalLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ CookieService ],
  exports:[PortalLoginComponent]
})
export class LoginModule { }
