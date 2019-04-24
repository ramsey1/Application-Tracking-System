import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLoginComponent } from './portal-login/portal-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ChangeCredentialsComponent } from './change-credentials/change-credentials.component';
import { RouterModule } from '@angular/router';
import { VerificationForPasswordComponent } from './verification-for-password/verification-for-password.component';


@NgModule({
  declarations: [PortalLoginComponent,VerificationForPasswordComponent,  ChangeCredentialsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [ CookieService ],
  exports:[PortalLoginComponent]
})
export class LoginModule { }
