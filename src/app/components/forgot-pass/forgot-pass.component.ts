import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const email = this.forgotPasswordForm.value.email;

    this.http
      .post('http://localhost:8000/api/todos/forgotpassword', { email })
      .subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          this.successMessage = response.message || 'OTP sent to your email successfully.';
          alert(this.successMessage)
          this.router.navigate(['/resetpassword']);
          
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.error.message || 'An error occurred. Please try again.';
        },
      });
  }
}
