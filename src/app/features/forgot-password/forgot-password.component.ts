import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  forgotPasswordMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      nit: ['', [Validators.required, this.nitValidator]],
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

            this.router.navigate(['/login']);

          },
          error => {
            console.error('Error during password reset request', error);
            this.message = 'Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.';

            if (
              error.status === 404 &&
              error.error?.message === 'NIT no encontrado.'
            ) {
              this.forgotPasswordMessage = 'El NIT ingresado no está registrado.';
              // You may choose not to increment failed attempts here
              // return; // Exit the error handling if needed
            }
          }
        );
    }
  }

  nitValidator(control: AbstractControl): ValidationErrors | null {
    const nit = control.value;
    if (!nit) {
      return null;
    }

    const nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');
    if (!nitRegExp.test(nit)) {
      return { nitInvalid: true };
    }

    const sanitizedNit = nit.replace(/-/, '');
    const lastChar = sanitizedNit.length - 1;
    const number = sanitizedNit.substring(0, lastChar);
    const expectedChecker = sanitizedNit
      .substring(lastChar, lastChar + 1)
      .toLowerCase();

    let factor = number.length + 1;
    let total = 0;

    for (let i = 0; i < number.length; i++) {
      const character = number.substring(i, i + 1);
      const digit = parseInt(character, 10);

      total += digit * factor;
      factor = factor - 1;
    }

    const modulus = (11 - (total % 11)) % 11;
    const computedChecker = modulus === 10 ? 'k' : modulus.toString();

    return expectedChecker === computedChecker ? null : { nitInvalid: true };
  }

  clearForgotPasswordMessage() {
    this.forgotPasswordMessage = '';
  }

}
