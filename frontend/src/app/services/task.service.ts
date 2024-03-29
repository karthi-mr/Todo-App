import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskList } from '../model/task-list';
import { DetailResult } from '../model/detail-result';
import { CreateTask, Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly TASK_API = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Array<TaskList>> {
    return this.http.get<Array<TaskList>>(this.TASK_API);
  }

  createTask(newTask: CreateTask): Observable<DetailResult> {
    return this.http.post<DetailResult>(this.TASK_API, newTask);
  }

  fetchTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.TASK_API}task/${id}`);
  }
}
