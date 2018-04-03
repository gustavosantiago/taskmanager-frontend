import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Angular2TokenService } from 'angular2-token';
import { Task } from './task.model';

@Injectable()

export class TaskService {
  public tasksUrl = 'tasks';
  
  constructor(private tokenHttp: Angular2TokenService) {}

  // Index
  public getAll(): Observable<Task[]> {
    let url = `${this.tasksUrl}?q[s]=updated_at+DESC` 
    
    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTasks(response))
  }

  // Important Tasks
  public getImportant(): Observable<Task[]> {
    let url = `${this.tasksUrl}?q[s]=deadline+ASC`

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTasks(response));
  }

  // Show
  public getById(id: number): Observable<Task> {
    let url = `${this.tasksUrl}/${id}`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTask(response));
  }

  // Create
  public create(task: Task): Observable<Task> {
    let body = JSON.stringify(task);

    return this.tokenHttp.post(this.tasksUrl, body)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTask(response));
  }

  // Update
  public update(task: Task): Observable<Task> {
    let url  = `${this.tasksUrl}/${task.id}`;
    let body = JSON.stringify(task);

    return this.tokenHttp.put(url, body)
      .catch(this.handleErrors)
      .map(() => task);
  }

  // Delete/Destroy
  public delete(id: number): Observable<null> {
    let url     = `${this.tasksUrl}/${id}`;

    return this.tokenHttp.delete(url)
      .catch(this.handleErrors)
      .map(() => null);
  }

  public searchByTitle(term: string): Observable<Task[]> {
    let url = `${this.tasksUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTasks(response));
  }

  // PRIVATE METHODS
  private handleErrors(errors: Response) {
    return Observable.throw(errors);
  }

  private responseToTasks(response: Response): Task[] {
    let collection = response.json().data as Array<any>;
    let tasks: Task[] = [];

    collection.forEach(item => {
      let task         = {
        id:          item.id,
        title:       item.attributes.title,
        deadline:    item.attributes.deadline,
        description: item.attributes.description,
        done:        item.attributes.done
      }

      tasks.push(task);
    });

    return tasks;
  }

  private responseToTask(response: Response): Task {
    let task = {
      id:          response.json().data.id,
      title:       response.json().data.attributes.title,
      deadline:    response.json().data.attributes.deadline,
      description: response.json().data.attributes.description,
      done:        response.json().data.attributes.done
    }
     
    return task;
  }
}
