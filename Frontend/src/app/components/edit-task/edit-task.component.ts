import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule,MatSelectModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number=0;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedUser: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(this.taskId).subscribe((task: any) => {
      this.taskForm.patchValue(task);
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.editTask(this.taskId, this.taskForm.value).subscribe(() => {
        this.router.navigate(['/admin-dashboard']);
      });
    }
  }
}