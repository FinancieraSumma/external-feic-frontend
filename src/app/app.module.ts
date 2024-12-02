import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { UserVerificationComponent } from './features/user-verification/user-verification.component';
import { LoginComponent } from './features/login/login.component';
import { LoginVerificationComponent } from './features/login-verification/login-verification.component';
import { MainComponent } from './features/main/main.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { LogoutComponent } from './features/logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastContainerComponent } from './services/toast-container.component';
import { ToastService } from './services/toast.service';
import { SidebarComponent } from './common/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserVerificationComponent,
    LoginComponent,
    LoginVerificationComponent,
    MainComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent,
    ToastContainerComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LeL9nAqAAAAAEO-eFKvx9kDv8e17J6g41usuFZC' // Replace with your actual reCAPTCHA v3 site key
    },
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
