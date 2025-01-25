import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FE';
  user: any = null; // Store user data
  dropdownOpen = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.fetchUserData(token);
    }
  }

  // Fetch user data
  fetchUserData(token: string) {
    this.http
      .get('http://localhost:8000/api/todos/getuser', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .subscribe({
        next: (response: any) => {
          this.user = response.data;
        },
        error: () => {
          console.error('Failed to fetch user data.');
        }
      });
  }

  // Toggle dropdown visibility
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Navigate to profile
  showProfile() {
    this.router.navigate(['/profile'], { state: { user: this.user } });
    this.dropdownOpen = false;
  }

  // Logout user
  logout() {
    localStorage.removeItem('accessToken'); // Remove token
    this.router.navigate(['/login']); // Redirect to login
  }
}
