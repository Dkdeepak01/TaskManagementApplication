import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule,MatSelectModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private router: Router, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedUser: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = { 
        ...this.taskForm.value, 
        status: "Pending", 
        dueDate: new Date(this.taskForm.value.dueDate).toISOString() 
      };
  
      console.log('📤 Task Data Before Sending:', JSON.stringify(taskData)); 
  
      this.taskService.createTask(taskData).subscribe({
        next: (response) => {
          console.log('✅ Task Created Successfully:', response);
          alert('Task Created Successfully!');
          this.router.navigate(['/admin-dashboard']); 
        },
        error: (error) => {
          console.error(' Error Creating Task:', error);
        }
      });
    } else {
      console.warn(' Form is invalid:', this.taskForm.errors);
    }
  }
  
}  