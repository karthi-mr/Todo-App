import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from '../../../model/task';
import { TaskService } from '../../../services/task.service';
import { NgClass, NgIf } from '@angular/common';
import { DateTimePipe } from '../../../pipes/date-time.pipe';
import { EmptyDataPipe } from '../../../pipes/empty-data.pipe';
import { ComStatusPipe } from '../../../pipes/com-status.pipe';
import { DetailResult } from '../../../model/detail-result';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    NgIf,
    DateTimePipe,
    RouterLink,
    EmptyDataPipe,
    ComStatusPipe,
    NgClass,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  taskId!: number;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.taskId = +params['id'];
        this.onFetchTask(this.taskId);
      },
    });
  }

  onFetchTask(id: number): void {
    this.taskService.fetchTask(id).subscribe({
      next: (data: Task) => {
        this.task = data;
      },
    });
  }

  onChangeCompleteStatus(id: number): void {
    this.taskService.modifyStatus(id).subscribe({
      next: (data: DetailResult) => {
        console.log(data);
        this.onFetchTask(id);
      },
    });
  }
}
