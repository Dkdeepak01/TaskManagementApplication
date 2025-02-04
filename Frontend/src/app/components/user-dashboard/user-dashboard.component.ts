import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';

interface Task {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  status: string;
  updatedStatus?: string; // Editable status
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'dueDate', 'description', 'status', 'updatedStatus', 'actions'];


  constructor(private userService: UserService, private router: Router ) {}

  ngOnInit() {
    this.loadTasks();
  }

 
  loadTasks() {
    this.userService.getAssignedTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
 
  updateStatus(task: any) {
    if (!task.updatedStatus) return; 

    this.userService.updateTaskStatus(task.id, task.updatedStatus).subscribe(() => {
      task.status = task.updatedStatus; 
      task.updatedStatus = ''; // Reset the updated status fiel
    });
  }
}