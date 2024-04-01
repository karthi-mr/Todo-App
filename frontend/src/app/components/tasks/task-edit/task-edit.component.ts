import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { CreateTask, Task } from '../../../model/task';
import { TaskService } from '../../../services/task.service';
import { DetailResult } from '../../../model/detail-result';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
})
export class TaskEditComponent implements OnInit {
  isEditMode: boolean = false;
  formTitle: string = '';
  formDesc: string = '';
  task!: Task;
  isCancel: boolean = false;
  @ViewChild('taskForm') form!: NgForm;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.onFetchTask(+params['id']);
      }
    });
  }

  private onFetchTask(id: number): void {
    this.taskService.fetchTask(id).subscribe({
      next: (data: Task) => {
        this.task = data;
        this.formTitle = data.title;
        this.formDesc = data.description;
      },
    });
  }

  onSubmitForm(form: NgForm): void {
    const newTask: CreateTask = new CreateTask(
      this.formTitle,
      this.formDesc ? this.formDesc : undefined
    );

    if (!this.isEditMode) {
      this.taskService.createTask(newTask).subscribe({
        next: (data: DetailResult) => {
          this.router.navigate(['/tasks']);
        },
      });
    } else {
      this.taskService.updateTask(this.task.id, newTask).subscribe({
        next: (data: DetailResult) => {
          this.router.navigate(['/tasks']);
        },
      });
    }
  }

  onCancel(): void {
    this.isCancel = true;
    this.router.navigate(['tasks']);
  }
}
