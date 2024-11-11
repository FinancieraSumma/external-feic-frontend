import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css'],
})
export class UserVerificationComponent {
  verificationForm: FormGroup;
  verificationMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.verificationForm = this.fb.group({
      codigoVerificacion: ['', Validators.required],
    });
  }

  onVerify() {
    const codigoVerificacion =
      this.verificationForm.get('codigoVerificacion')?.value;
    if (codigoVerificacion) {
      this.http
        .post('http://localhost:5000/api/verify', { codigoVerificacion })
        .subscribe(
          (response) => {
            console.log('Verification successful', response);
            this.verificationMessage =
              'Verificación exitosa. Ahora puedes iniciar sesión.';
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
