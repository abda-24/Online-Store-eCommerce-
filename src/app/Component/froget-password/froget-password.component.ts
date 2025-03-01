import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-froget-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './froget-password.component.html',
  styleUrl: './froget-password.component.scss',
})
export class FrogetPasswordComponent {
  // Method for Back button

  private readonly fb = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  VerifyEmail: FormGroup;
  VerifyRestCode: FormGroup;
  ResetPassword: FormGroup;

  constructor() {
    this.VerifyEmail = this.fb.group({
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
    });
    this.VerifyRestCode = this.fb.group({
      resetCode: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 6 }),
          RxwebValidators.maxLength({ value: 6 }),
        ],
      ],
    });
    this.ResetPassword = this.fb.group({
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
      newPassword: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({ expression: { pattern: /^\w{6,}$/ } }),
        ],
      ],
    });
  }
  steep: number = 1;

  isLoading: boolean = false;

  SubmitVerifyEmail(): void {
    let emailValue = this.VerifyEmail.get('email')?.value;
    this.ResetPassword.get('email')?.patchValue(emailValue);
    this._AuthService.SetVerifyEmail(this.VerifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.steep = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  SubmitVerifyCode(): void {
    this._AuthService.SetVerifyRestCode(this.VerifyRestCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.steep = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  RestPasswordSubmit(): void {
    this._AuthService.SetRestPassword(this.ResetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.SaveUserDataToken();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
