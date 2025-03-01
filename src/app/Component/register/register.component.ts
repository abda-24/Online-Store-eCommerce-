import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { pattern, RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../core/services/auth.service';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  RegisterFrom: FormGroup;
  messageError: string = '';
  isLoading: boolean = false;
  UnsubscribeRegister!: Subscription;
  constructor(private fb: FormBuilder) {
    this.RegisterFrom = this.fb.group({
      name: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 5 }),
          RxwebValidators.maxLength({ value: 50 }),
        ],
      ],
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
      password: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({ expression: { pattern: /^\w{6,}$/ } }),
        ],
      ],
      rePassword: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.compare({ fieldName: 'password' }),
        ],
      ],
      phone: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({
            expression: { pattern: /^01[0125][0-9]{8}$/ },
          }),
        ],
      ],
    });
  }
  submitData(): void {
    if (this.RegisterFrom.valid) {
      this.isLoading = true; // Show loading state
      this.UnsubscribeRegister = this._AuthService
        .setRegisterFrom(this.RegisterFrom.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this._Router.navigate(['login']);
            }
            this.isLoading = false; // Hide loading state
            // Success Alert 🎉
            Swal.fire({
              icon: 'success',
              title: 'Success! 🎉',
              text: 'Your registration was successful!',
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
      this.RegisterFrom.markAllAsTouched();

      // Form Invalid Alert ⚠️
      Swal.fire({
        icon: 'warning',
        title: 'Form Invalid ⚠️',
        text: 'Please check your form and try again.',
        confirmButtonText: 'OK',
      });
    }
  }
  ngOnDestroy(): void {
    this.UnsubscribeRegister?.unsubscribe();
  }
}
