import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  task: any;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit() {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(taskId).subscribe((task: any) => {
      this.task = task;
    });
  }
}