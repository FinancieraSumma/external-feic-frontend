import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  message: string = '';
  token: string = '';
  nit: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.nit = params['nit'];
    });
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      const { password } = this.resetPasswordForm.value;

      this.http.post('http://localhost:5000/api/resetPassword', { password, token: this.token, nit: this.nit })
        .subscribe(
          response => {
            console.log('Password reset successful', response);
            this.message = 'Contraseña restablecida exitosamente. Ahora puedes iniciar sesión.';
          },
          error => {
            console.error('Error during password reset', error);
            this.message = 'Hubo un problema al restablecer tu contraseña. Inténtalo de nuevo.';
          }
        );
    }
  }
}
