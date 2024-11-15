import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.css'],
})
export class LoginVerificationComponent implements OnInit {
  verificationForm: FormGroup;
  verificationMessage: string = '';
  loginVerificationMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
    this.verificationForm = this.fb.group({
      verificationCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as { fromRegistration: boolean };

    // if (state?.fromRegistration) {
    this.toastService.show(
      'Se ha enviado un correo electrónico con el código de verificación para validar tu ingreso a la plataforma. Por favor revisa tu bandeja de entrada.',
      { classname: 'bg-success text-light', autohide: false, header: '' }
    );
    // }
  }

  onVerify() {
    const codigoVerificacion =
      this.verificationForm.get('verificationCode')?.value;
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

            this.loginVerificationMessage = 'El código de verificación es incorrecto o ha expirado.';
          }
        );
    }
  }
}
