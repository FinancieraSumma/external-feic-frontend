import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nit: ['', [Validators.required, this.nitValidator]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    const { nit, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      this.http.post('http://localhost:5000/api/login', { nit, password })
        .subscribe(
          response => {
            console.log('Login successful', response);
            this.loginMessage = 'Inicio de sesión exitoso. Se ha enviado un correo electrónico con el código de verificación de inicio de sesión.';

            this.router.navigate(['/verifyLogin']);
          },
          error => {
            console.error('Login failed', error);
            this.loginMessage = 'Credenciales incorrectas o usuario no registrado.';
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
    const expectedChecker = sanitizedNit.substring(lastChar, lastChar + 1).toLowerCase();

    let factor = number.length + 1;
    let total = 0;

    for (let i = 0; i < number.length; i++) {
      const character = number.substring(i, i + 1);
      const digit = parseInt(character, 10);

      total += (digit * factor);
      factor = factor - 1;
    }

    const modulus = (11 - (total % 11)) % 11;
    const computedChecker = (modulus === 10 ? 'k' : modulus.toString());

    return expectedChecker === computedChecker ? null : { nitInvalid: true };
  }

}