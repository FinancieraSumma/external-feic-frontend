import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotPasswordForm = this.fb.group({
      nit: ['', Validators.required]
    });
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const { nit } = this.forgotPasswordForm.value;

      this.http.post('http://localhost:5000/api/forgotPassword', { nit })
        .subscribe(
          response => {
            console.log('Password reset email sent', response);
            this.message = 'Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico.';
          },
          error => {
            console.error('Error during password reset request', error);
            this.message = 'Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.';
          }
        );
    }
  }
}
