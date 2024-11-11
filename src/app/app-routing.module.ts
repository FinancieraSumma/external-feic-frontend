import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { UserVerificationComponent } from './features/user-verification/user-verification.component';

const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: 'verify', component: UserVerificationComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
