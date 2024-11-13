import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.css'],
})
export class LoginVerificationComponent {
  verificationForm: FormGroup;
  verificationMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      codigoVerificacion: ['', Validators.required],
    });
  }

  onVerify() {
    const codigoVerificacion =
      this.verificationForm.get('codigoVerificacion')?.value;
    if (codigoVerificacion) {
      this.http
        .post('http://localhost:5000/api/verifyLogin', {
          token: codigoVerificacion,
        })
        .subscribe(
          (response) => {
            console.log('Login verification successful', response);
            this.verificationMessage =
              'Inicio de sesión verificado exitosamente.';

            // Redirect to main page
            this.router.navigate(['/main']);
          },
          (error) => {
            console.error('Verification failed', error);
            this.verificationMessage =
              'El código de verificación es incorrecto o ha expirado.';
          }
        );
    }
  }
}
