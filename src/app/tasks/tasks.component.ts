import { Component, OnInit } from '@angular/core';

const TASKS: Array<any> = [
  { id: 1, title: 'Realizar Tarefa 1'},
  { id: 2, title: 'Realizar Tarefa 2' },
  { id: 3, title: 'Realizar Tarefa 3' },
  { id: 4, title: 'Realizar Tarefa 4' },
  { id: 5, title: 'Realizar Tarefa 5' },
  { id: 6, title: 'Realizar Tarefa 6' },
  { id: 7, title: 'Realizar Tarefa 7' },
];

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
  public tasks;
  
  public constructor(){
    this.tasks = ''
  }
  
  public ngOnInit(){
    this.tasks = TASKS;
  }
}