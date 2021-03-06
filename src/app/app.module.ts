// angular library
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Angular2TokenService } from 'angular2-token';

// app components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskSearchComponent } from './navbar/task-search/task-search.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

// sign up components
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

// services imports
import { TaskService } from './tasks/shared/task.service';
import { TokenService } from './shared/token.service';
import { AuthService } from './shared/auth.service';

// guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

// modules imports
import { AppRoutingModule } from './app-routing.module';

// rxjs oprators
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

// rxjs extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// jquery plugins
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SignInFormComponent,
    SignUpFormComponent,
    TaskDetailComponent,
    TaskSearchComponent,
    TasksComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    Angular2TokenService,
    AuthGuard,
    AuthService,
    NotAuthenticatedGuard,
    TaskService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
