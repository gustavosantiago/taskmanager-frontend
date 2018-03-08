import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
  public tasks: Array<Task>;
  public newTask: Task;

  public constructor(private taskService: TaskService){ 
    this.newTask = new Task(null, '');
  }
  
  ngOnInit(){
    this.taskService.getAll()
      .subscribe(
        tasks => this.tasks = tasks,
        error => alert('Ocorreu um erro')
      )
  }

  createTask(){
    this.newTask.title = this.newTask.title.trim();
    
    if(!this.newTask.title) {
      alert('Tarefa necessita de um título')
    } else {
      this.taskService.create(this.newTask)
        .subscribe(
          (task) => {
            this.tasks.push(task);
            this.newTask = new Task(null, '')
          },
          () => alert('Houve um erro')
        )
    }
  }

  deleteTask(task: Task) {
    if(confirm(`Deseja excluir a tarefa #"${task.id}"?`)){
      this.taskService.delete(task.id)
        .subscribe(
          () => this.tasks = this.tasks.filter(t => t !== task),
          () => alert('Ocorreu um erro')
        ) 
    }
  }

}