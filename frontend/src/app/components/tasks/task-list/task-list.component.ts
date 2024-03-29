import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { TaskList } from '../../../model/task-list';
import { TaskService } from '../../../services/task.service';
import { RouterLink } from '@angular/router';
import { TaskStatusDirective } from '../../../directives/task-status.directive';
import { DateTimePipe } from '../../../pipes/date-time.pipe';
import { ComStatusPipe } from '../../../pipes/com-status.pipe';
import { ShrinkPipe } from '../../../pipes/shrink.pipe';

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
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks!: Array<TaskList>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: (taskList: Array<TaskList>) => {
        this.tasks = taskList;
      },
    });
  }
}
