import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,CommonModule,MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: any[] = [];
  @Input() deleteTask!: (taskId: number) => void; 
  displayedColumns: string[] = ['title', 'assignedUser', 'status', 'dueDate', 'actions'];
}