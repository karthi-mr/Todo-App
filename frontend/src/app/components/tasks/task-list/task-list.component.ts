import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TaskList } from '../../../model/task-list';
import { TaskService } from '../../../services/task.service';
import { TaskStatusDirective } from '../../../directives/task-status.directive';
import { DateTimePipe } from '../../../pipes/date-time.pipe';
import { ComStatusPipe } from '../../../pipes/com-status.pipe';
import { ShrinkPipe } from '../../../pipes/shrink.pipe';
import { DetailResult } from '../../../model/detail-result';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    TaskStatusDirective,
    DateTimePipe,
    ComStatusPipe,
    ShrinkPipe,
    NgClass,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks!: Array<TaskList>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.onGetAllTasks();
  }

  private onGetAllTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (taskList: Array<TaskList>) => {
        this.tasks = taskList;
      },
    });
  }

  onChangeCompleteStatus(id: number): void {
    this.taskService.modifyStatus(id).subscribe({
      next: (data: DetailResult) => {
        console.log(data);
        this.onGetAllTasks();
      },
    });
  }
}
