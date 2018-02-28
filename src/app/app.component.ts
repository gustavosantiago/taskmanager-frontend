import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class Task {
  id: number;
  title: string;
}

export class AppComponent {
  title = 'Gerenciador de Tarefas';
  task  = 'Enviar o faturamento ao cliente'
}
