import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

const ROUTES = RouterModule.forRoot([
  {path: 'tasks/:id', component: TaskDetailComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'sign-up', component: SignUpFormComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
]);

@NgModule({
  imports: [ROUTES],
  exports: [RouterModule]
})

export class AppRoutingModule { }
