import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';


import { Task } from './task.model';

@Injectable()

export class TaskService{
  public tasksUrl = 'api/tasks';
  constructor(private http: Http){}

  // Index
  getAll(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Task[]);
  }

  // Important Tasks
  getImportant(): Observable<Task[]> {
    return this.getAll()
      .catch(this.handleErrors)
      .map(tasks => tasks.slice(0, 3));
  }

  // Show
  getById(id: number): Observable<Task> {
    let url = `${this.tasksUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json() as Task);

  }

  // Create
  create(task: Task): Observable<Task> {
    let body = JSON.stringify(task);
    let headers = new Headers({
      'Content-type': 'application/json'
    });

    return this.http.post(this.tasksUrl, body, { headers: headers })
      .catch(this.handleErrors)
      .map((response) => response.json() as Task)
  }
  
  // Update 
  update(task: Task): Observable<Task> {
    let url  = `${this.tasksUrl}/${task.id}`;
    let body = JSON.stringify(task)
    let headers = new Headers({
      'Content-type': 'application/json'
    });

    return this.http.put(url, body, {headers: headers})
      .catch(this.handleErrors)
      .map(() => task)
  }

  // Delete/Destroy
  delete(id: number): Observable<null> {
    let url     = `${this.tasksUrl}/${id}`;
    let headers = new Headers({
      'Content-type': 'application/json'
    });

    return this.http.delete(url, {headers: headers})
      .catch(this.handleErrors)
      .map(() => null)
  }

  searchByTitle(term: string): Observable<Task[]> {
    let url = `${this.tasksUrl}?title=${term}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json())
  }

  private handleErrors(errors: Response) {
    return Observable.throw(errors);
  }
}