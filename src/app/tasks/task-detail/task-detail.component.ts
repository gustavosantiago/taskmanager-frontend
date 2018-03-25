import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

import * as $ from 'jquery';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  taskDoneOptions: Array<any>;
  reactiveTaskForm: FormGroup;
  task: Task;

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

    this.reactiveTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      deadline: [null, Validators.required],
      description: [null, Validators.required],
      done: [null, Validators.required]
    });
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
    this.reactiveTaskForm.patchValue(task);
  }

  public ngAfterViewInit() {
    this.reactiveTaskForm.get('deadline').setValue(
      String($('#deadline').val()
    ));
  }

  public goBack() {
    this.location.back();
  }

  public updateTask() {
    this.task.title = String(this.reactiveTaskForm.get('title'));
    this.task.description = String(this.reactiveTaskForm.get('description'));
    this.task.deadline = String(this.reactiveTaskForm.get('deadline'));
    this.task.done = Boolean(this.reactiveTaskForm.get('done'));

    this.taskService.update(this.task)
      .subscribe(
        () => alert('Tarefa atualizada'),
        error => alert('Não atualizou')
      );
  }

  // form errors methods
  public fieldClassForErrorOrSuccess(fieldName: string) {
    return {
      'is-invalid': this.showFieldError(fieldName),
      'is-valid': this.getField('title').valid
    };
  }

  public showFieldError(fieldName: string): boolean {
    const field = this.getField(fieldName);
    return field.invalid && (field.touched || field.dirty);
  }

  public getField(fieldName) {
    return this.reactiveTaskForm.get(fieldName);
  }
}
