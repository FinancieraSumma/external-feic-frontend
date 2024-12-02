import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginMessage: string = '';
  failedAttempts: number = 0;
  maxAttempts: number = 3; // Maximum allowed attempts

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nit: ['', [Validators.required, this.nitValidator]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const { nit, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      this.http
        .post('http://localhost:5000/api/login', { nit, password })
        .subscribe(
          (response) => {
            console.log('Login successful', response);
            // Reset failed attempts on successful login
            this.failedAttempts = 0;
            this.loginMessage =
              'Inicio de sesión exitoso. Se ha enviado un correo electrónico con el código de verificación de inicio de sesión.';
            this.router.navigate(['/verifyLogin']);
          },
          (error) => {
            console.error('Login failed', error);

            if (
              error.status === 404 &&
              error.error?.message === 'NIT no encontrado.'
            ) {
              this.loginMessage = 'El NIT ingresado no está registrado.';
              // You may choose not to increment failed attempts here
              // return; // Exit the error handling if needed
            } else {
              // **Proceed with Failed Attempts Logic**
              this.failedAttempts++;

              if (this.failedAttempts >= this.maxAttempts) {
                // Invoke backend to block the user
                this.http
                  .post('http://localhost:5000/api/blockUser', { nit })
                  .subscribe(
                    () => {
                      this.loginMessage =
                        'Has superado el número máximo de intentos. Tu cuenta ha sido bloqueada. Por favor, utiliza "¿Olvidaste tu contraseña?" para restablecer tu contraseña.';
                    },
                    (blockError) => {
                      console.error('Error blocking user', blockError);
                      this.loginMessage =
                        'Error al bloquear la cuenta. Por favor, inténtalo de nuevo más tarde.';
                    }
                  );
              } else {
                const attemptsLeft = this.maxAttempts - this.failedAttempts;
                this.loginMessage = `Credenciales incorrectas. Te queda(n) ${attemptsLeft} intento(s).`;
              }
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
}
