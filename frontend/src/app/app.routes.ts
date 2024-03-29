import { Routes } from '@angular/router';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    children: [
      { path: '', component: TaskListComponent },
      { path: 'view/:id', component: TaskDetailComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
