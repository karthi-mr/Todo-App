import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Task } from '../../../model/task';
import { TaskService } from '../../../services/task.service';
import { NgIf } from '@angular/common';
import { DetailResult } from '../../../model/detail-result';

@Component({
  selector: 'app-task-delete',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './task-delete.component.html',
  styleUrl: './task-delete.component.scss',
})
export class TaskDeleteComponent implements OnInit {
  task!: Task;
  taskId!: number;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
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

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: (msg: DetailResult) => {
        console.log(msg);
        this.router.navigate(['/tasks']);
      },
    });
  }
}
