import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

import * as $ from 'jquery';
import 'jquery-ui';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  reactiveTaskForm: FormGroup;
  task: Task;
  taskDoneOptions: Array<any> = [
    { value: false, text: 'Pendente' },
    { value: true, text: 'Concluído' }
  ];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.reactiveTaskForm = new FormGroup({
      title: new FormControl(''),
      deadline: new FormControl(''),
      description: new FormControl(''),
      done: new FormControl('')
    });
   }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.taskService.getById(+params['id']))
      .subscribe(
        task => this.task = task,
        error => alert('Ocorreu um erro')
      );
  }

  ngAfterViewInit() {
    this.task.deadline = String($('#deadline').val());
  }

  goBack() {
    this.location.back();
  }

  updateTask() {
    this.taskService.update(this.task)
      .subscribe(
        () => alert('Tarefa atualizada'),
        error => alert('Ocorreu um erro')
      );
  }
}
