import { Injectable } from '@angular/core';

import { Task } from './task.model';

const TASKS: Array<Task> = [
  { id: 1, title: 'Realizar Tarefa 1' },
  { id: 2, title: 'Realizar Tarefa 2' },
  { id: 3, title: 'Realizar Tarefa 3' },
  { id: 4, title: 'Realizar Tarefa 4' },
  { id: 5, title: 'Realizar Tarefa 5' },
  { id: 6, title: 'Realizar Tarefa 6' },
  { id: 7, title: 'Realizar Tarefa 7' },
];

@Injectable()

export class TaskService{
  getTasks(): Promise<{Task: Task[]}> {
    let promise = new Promise(function(resolve, reject){
      if(TASKS.length > 0) {
        setTimeout(() => {
          resolve(TASKS);
        }, 1000);
      } else {
        let error = 'Não há tarefas';
        reject(error);
      }      
    })

    return promise;
  }
}