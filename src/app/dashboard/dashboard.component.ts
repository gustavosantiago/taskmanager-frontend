import { Component, OnInit } from '@angular/core';

import { Task } from '../tasks/shared/task.model';
import { TaskService } from '../tasks/shared/task.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public tasks: Task[];

  public constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getImportant()
      .subscribe(
        tasks => this.tasks = tasks,
        error => console.log(error)
      );

  }
}
