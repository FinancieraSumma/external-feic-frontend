import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { UserVerificationComponent } from './features/user-verification/user-verification.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    HttpClientModule
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LeL9nAqAAAAAEO-eFKvx9kDv8e17J6g41usuFZC' // Replace with your actual reCAPTCHA v3 site key
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
