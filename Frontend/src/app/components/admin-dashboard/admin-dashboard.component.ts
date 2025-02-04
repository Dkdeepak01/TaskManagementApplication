import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // ✅ Import Router
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule, CommonModule, RouterModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  searchForm: FormGroup;
  tasks = new MatTableDataSource<any>();
  displayedColumns: string[] = ['title', 'assignedUser', 'status', 'dueDate', 'actions'];

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router 
  ) {
    this.searchForm = this.fb.group({
      title: [''],
      status: [''],
      dueDate: [null],
    });
  }
  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }

  ngOnInit() {
    this.loadTasks();
  }


  loadTasks() {
    this.taskService.getAllTasks().subscribe((response: any) => {
      this.tasks.data = response;
    });
  }
  navigateToAddTask() {
    console.log('🔄 Navigating to Add Task Page...');
    this.router.navigate(['/add-task']); // Navigate to Add Task page
  }

  onSearch() {
    const { title, status, dueDate } = this.searchForm.value;
    this.taskService.searchTasks(title, status, dueDate).subscribe((response: any) => {
      this.tasks.data = response;
    });
  }

  editTask(taskId: number) {
    this.router.navigate(['/edit-task', taskId]); // ✅ Navigate to edit page
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks.data = this.tasks.data.filter((task) => task.id !== taskId);
    });
  }
}
