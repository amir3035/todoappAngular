import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null; // Holds the user data
  apiUrl = 'http://localhost:8000/api/todos/getuser'; // API endpoint to fetch user details

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Fetch user details
  getUserDetails(): void {
    const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
    if (!token) {
      alert('Please Login first.');
      this.router.navigate(['/login']);
      return;
    }

    this.http
      .get(this.apiUrl, { headers: { Authorization: `Bearer ${token}` } })
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            this.user = response.data; // Assign user data
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
          alert('Failed to fetch user details. Redirecting to login.');
          this.router.navigate(['/login']);
        }
      );
  }

  // Redirect to dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
