// reset-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent {
  resetPasswordForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formData = this.resetPasswordForm.value;

    this.http.patch('http://localhost:8000/api/todos/resetpassword', formData).subscribe({
      next: (response: any) => {
        alert(response.message || 'Password reset successful!');
      },
      error: (error) => {
        console.error('Error:', error);
        alert(error.error?.message || 'Something went wrong, please try again.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
