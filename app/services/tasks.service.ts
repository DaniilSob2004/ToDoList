import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

import { Task } from '../interfaces/task';
import { ProjectTasksService } from './project-tasks.service';
import { getRandomInt } from '../shared/random';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = 'http://localhost:3000/tasks/';

  constructor(
    private http: HttpClient,
    private projectTasksService: ProjectTasksService) { }

  getTasks(projectId: string): Observable<Task[]> {
    return this.projectTasksService.getProjectTasks(projectId).pipe(
      switchMap(projectTasks => {
        return this.http.get<Task[]>(this.url).pipe(
          map(tasks => {
            return tasks.filter(task => projectTasks.some(pt => pt.idTask === task.id));
          })
        );
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    task.id = getRandomInt().toString();
    return this.http.post<Task>(this.url, task);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.url}${id}`);
  }

  deleteTasks(projectId: string): Observable<Task[]> {
    return this.getTasks(projectId).pipe(
      switchMap(tasks => {
        const deleteObservables: Observable<Task>[] = [];
        tasks.forEach(task => {
          deleteObservables.push(this.deleteTask(task.id));
        });
        return forkJoin(deleteObservables);
      })
    );
  }

  changeTask(task: Task, newTask: Task): Observable<Task> {
    Object.assign(task, newTask);
    return this.http.put<Task>(`${this.url}${task.id}`, newTask);
  }
}
