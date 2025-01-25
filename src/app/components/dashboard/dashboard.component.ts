import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskForm: FormGroup;
  tasks: any[] = [];
  token: string | null;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private router:Router) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
    this.token = localStorage.getItem('accessToken');
    // if(!this.token){
    //   alert('Failed to fetch user details. Please login.');
    //   this.router.navigate(['/login']);
    // }
  }

  ngOnInit(): void {
    this.getTasks();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
      this.http.post<any>('http://localhost:8000/api/todos/createtask', taskData, { headers }).subscribe(
        response => {
          console.log(response);
          this.getTasks(); // Refresh tasks after adding a new one
          this.taskForm.reset(); // Reset the form
        },
        error => {
          console.error('Error:', error);
  
        }
      );
    }
  }

  getTasks(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    this.http.get<any>('http://localhost:8000/api/todos/gettask', { headers }).subscribe(
      response => {
        console.log(response);
         // Filter tasks with completed: true and important: true
         const importantTasks = response.data.filter((task: any) => task.important && !task.status);
         const completedTasks = response.data.filter((task: any) => task.status );
         const otherTasks = response.data.filter((task: any) => !task.important && !task.status);
   
         // Concatenate tasks in the desired order
         this.tasks = [...importantTasks, ...otherTasks, ...completedTasks];
        //this.tasks = response.data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  deleteTask(taskId: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    this.http.delete<any>(`http://localhost:8000/api/todos/deletetask/${taskId}`, { headers }).subscribe(
      response => {
        console.log(response);
        alert(response.message)
        this.getTasks(); // Refresh tasks after deletion
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  markAsComplete(taskId: string): void {
    console.log(taskId,'taskId')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    this.http.patch<any>(`http://localhost:8000/api/todos/edittask/${taskId}`, { status: true }, { headers }).subscribe(
      response => {
        console.log(response);
        alert(response.message)
        this.getTasks(); // Refresh tasks after marking as complete
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  markAsImportant(taskId: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    this.http.patch<any>(`http://localhost:8000/api/todos/edittask/${taskId}`, { important: true }, { headers }).subscribe(
      response => {
        console.log(response);
        alert(response.message)
        this.getTasks(); // Refresh tasks after marking as important
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
