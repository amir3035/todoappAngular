import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required], // Add confirmpassword control
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      image: [null, Validators.required] // Initialize image control with null
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();
      console.log(formData,'data')
  
      // Append form data to the FormData object
      Object.keys(this.registerForm.value).forEach(key => {
        if (key === 'phone_number') {
          formData.append('phone_Number', this.registerForm.get(key)!.value); // Change to phone_Number
        } else {
          formData.append(key, this.registerForm.get(key)!.value);
        }
      });
  
      const headers = new HttpHeaders();
      // Don't set Content-Type, let Angular set it automatically with FormData
  
      this.http.post<any>('http://localhost:8000/api/todos/createuser', formData, { headers }).subscribe(
        response => {
          if (response.status === 200) {
            localStorage.setItem('accessToken', response.accessToken);
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'Failed to register user. Please try again.';
        }
      );
    }
  }
  
  
  onFileChange(event: any): void {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // Set the value of the image control to the file object
      this.registerForm.patchValue({ image: file });
    }
  }
}
