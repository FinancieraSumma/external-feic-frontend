import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
  recaptchaToken: string | undefined;

  constructor(
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private http: HttpClient
  ) {
    this.registrationForm = this.fb.group({
      nit: ['', [Validators.required, this.nitValidator]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      password: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')
          ],
          updateOn: 'blur'
        }
      ],
      token: ['']
    });
        
    console.log('Initial form state:', this.registrationForm.value);
    console.log('Password control initial setup:', this.registrationForm.get('password'));
  }

  ngOnInit(): void {
    this.registrationForm.get('password')?.valueChanges.subscribe(value => {
      console.log('Password field changed to:', value);
      console.log('Password control status:', this.registrationForm.get('password')?.status);
      console.log('Password control errors:', this.registrationForm.get('password')?.errors);
    });
  }

  onSubmit() {
    if (this.registrationForm) {
      // Mark all fields as touched so validation errors are shown
      Object.keys(this.registrationForm.controls).forEach(field => {
        const control = this.registrationForm.get(field);
        control?.markAsTouched({ onlySelf: true });
        control?.markAsDirty({ onlySelf: true });
      });
  
      if (this.registrationForm.valid) {
        // Execute reCAPTCHA and proceed only if the token is generated successfully
        this.executeRecaptcha()
          .then(() => {
            // Ensure reCAPTCHA token is patched before submitting
            console.log('Form before submit:', this.registrationForm.value); // Debug log
  
            this.http.post('http://localhost:5000/api/register', this.registrationForm.value)
              .subscribe(
                response => console.log('Registration successful', response),
                error => console.error('Registration failed', error)
              );
          })
          .catch((error) => {
            console.error('reCAPTCHA generation failed:', error);
          });
      } else {
        console.log('Form is not valid');
      }
    }
  }

  executeRecaptcha(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.recaptchaV3Service.execute('register').subscribe(
        (token) => {
          if (token) {
            this.registrationForm.patchValue({ token });
            console.log('reCAPTCHA token:', token); // Debug log
            resolve(token);
          } else {
            reject('Failed to generate reCAPTCHA token');
          }
        },
        (error) => reject(error)
      );
    });
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
