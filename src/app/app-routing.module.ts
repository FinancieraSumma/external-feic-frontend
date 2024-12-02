import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { UserVerificationComponent } from './features/user-verification/user-verification.component';
import { LoginComponent } from './features/login/login.component';
import { LoginVerificationComponent } from './features/login-verification/login-verification.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { LogoutComponent } from './features/logout/logout.component';
import { MainComponent } from './features/main/main.component';
import { AuthGuard } from './auth.guard';
import { IndividualEditComponent } from './features/individual/individual-edit/individual-edit.component';

const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: 'verify', component: UserVerificationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verifyLogin', component: LoginVerificationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'individual', component: IndividualEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
