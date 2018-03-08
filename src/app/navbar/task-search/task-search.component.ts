import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { Task } from "../../tasks/shared/task.model";
import { TaskService } from "../../tasks/shared/task.service";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html'
})

export class TaskSearchComponent {
  searchTerms: Subject<string> = new Subject();
  tasks: Task[] = [];

  public constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(){
    this.searchTerms.switchMap(
      term => term ? this.taskService.searchByTitle(term) : Observable.of<Task[]>([])
    ).subscribe(tasks => this.tasks = tasks)
  }

  search(term: string){
    this.searchTerms.next(term);  
  }

  goToTask(task: Task){
    this.tasks = [];
    this.router.navigate(['/tasks', task.id]);
  }
}