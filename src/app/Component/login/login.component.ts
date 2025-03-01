import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  messageError: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
      password: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({ expression: { pattern: /^\w{6,}$/ } }),
        ],
      ],
    });
  }

  submitData(): void {
    if (this.loginForm.valid) {
      this.isLoading = true; // Show loading state
      this.authService.SetLoginFrom(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            // & 2 SaveToken
            localStorage.setItem('userToken', res.token);

            // & 2 Decode token
            this.authService.SaveUserDataToken();
            this._router.navigate(['/home']); // Navigate to home or dashboard after successful login
          }
          this.isLoading = false; // Hide loading state
          // Success Alert 🎉
          Swal.fire({
            icon: 'success',
            title: 'Success! 🎉',
            text: 'Your login was successful!',
            confirmButtonText: 'OK',
          });
        },
        error: (err: HttpErrorResponse) => {
          this.messageError = err.error.message;
          console.log(err);
          this.isLoading = false; // Hide loading state
          // Error Alert ❌
          Swal.fire({
            icon: 'error',
            title: 'Oops... ❌',
            text: this.messageError || 'Something went wrong!',
            confirmButtonText: 'Try Again',
          });
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();

      // Form Invalid Alert ⚠️
      Swal.fire({
        icon: 'warning',
        title: 'Form Invalid ⚠️',
        text: 'Please check your form and try again.',
        confirmButtonText: 'OK',
      });
    }
  }
}
