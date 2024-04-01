import { CanDeactivateFn } from '@angular/router';
import { TaskEditComponent } from '../components/tasks/task-edit/task-edit.component';

export const cancelEditTaskGuard: CanDeactivateFn<any> = (
  component: TaskEditComponent,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.isCancel && !component.form.untouched) {
    return confirm('Are you cancelling this edit?');
  }
  return true;
};
