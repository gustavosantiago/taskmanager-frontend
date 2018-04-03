import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FormUtils } from './../../shared/form.utils';
import { Task } from './../shared/task.model';
import { TaskService } from '../shared/task.service';

import * as $ from 'jquery';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  task: Task;
  taskDoneOptions: Array<any>;
  formUtils: FormUtils;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    // tslint:disable-next-line:no-unused-expression
    this.taskDoneOptions = [
      { value: false, text: 'Pendente' },
      { value: true, text: 'Concluído' }
    ];

    this.form = this.formBuilder.group({
      title: new FormControl([null, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]]),
      deadline: new FormControl([null, Validators.required]),
      description: new FormControl([null, Validators.required]),
      done: new FormControl([null, Validators.required])
    });

    this.formUtils = new FormUtils(this.form);
   }

  public ngOnInit() {
    this.task = new Task(null, null, null, null);

    this.route.params
      .switchMap((params: Params) => this.taskService.getById(+params['id']))
      .subscribe(
        task => this.setTask(task),
        error => alert('Não inciou')
      );
  }

  public setTask(task: Task): void {
    this.task = task;
    this.form.patchValue(task);
  }

  public ngAfterViewInit() {
    this.form.get('deadline').setValue(
      String($('#deadline').val()
    ));

  }

  public goBack() {
    this.location.back();
  }

  public updateTask() {
    this.task.title = this.form.get('title').value;
    this.task.deadline = this.form.get('deadline').value;
    this.task.done = this.form.get('done').value;
    this.task.description = this.form.get('description').value;

    this.taskService.update(this.task)
      .subscribe(
        () => alert("Tarefa atualizada com sucesso!"),
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}
