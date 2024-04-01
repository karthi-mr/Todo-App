import { Routes } from '@angular/router';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { TaskDeleteComponent } from './components/tasks/task-delete/task-delete.component';
import { TaskEditComponent } from './components/tasks/task-edit/task-edit.component';
import { cancelEditTaskGuard } from './guard/cancel-edit-task.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    children: [
      { path: '', component: TaskListComponent },
      { path: 'create', component: TaskEditComponent },
      { path: 'view/:id', component: TaskDetailComponent },
      {
        path: 'edit/:id',
        component: TaskEditComponent,
        canDeactivate: [cancelEditTaskGuard],
      },
      { path: 'delete/:id', component: TaskDeleteComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
