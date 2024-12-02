import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css'],
})
export class UserVerificationComponent implements OnInit {
  verificationForm: FormGroup;
  verificationMessage: string = '';
  verificationSuccessful: boolean = false;
  userVerificationMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
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
      'Se ha enviado un correo electrónico con el código de verificación para completar tu registro. Por favor revisa tu bandeja de entrada.',
      { classname: 'bg-success text-light', autohide: false, header: '' }
    );
    // }
  }

  onVerify() {
    const codigoVerificacion =
      this.verificationForm.get('verificationCode')?.value;
    if (codigoVerificacion) {
      this.http
        .post('http://localhost:5000/api/verify', { token: codigoVerificacion })
        .subscribe(
          (response) => {
            console.log('Verification successful', response);
            this.verificationMessage =
              'Verificación exitosa. Ahora puedes iniciar sesión.';
            this.verificationSuccessful = true;

            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Verification failed', error);
            this.verificationMessage =
              'El código de verificación es incorrecto o ha expirado.';

            this.userVerificationMessage =
              'El código de verificación es incorrecto o ha expirado.';
          }
        );
    }
  }
}
