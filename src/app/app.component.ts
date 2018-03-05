import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gerenciador de Tarefas';
  task: Task = new Task(21, 'Teste qa')
}

export class Task {
  id: number;
  title: string;

  constructor(id: number, title: string){
    this.id = id;
    this.title = title;
  }
}