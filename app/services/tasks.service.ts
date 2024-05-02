import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

import { Task } from '../interfaces/task';
import { ProjectTask } from '../interfaces/project-task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  urlTask = 'http://localhost:3000/tasks';
  urlProjectTask = 'http://localhost:3000/project-tasks';

  constructor(private http: HttpClient) { }

  private getProjectTasks(projectId: string): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(this.urlProjectTask).pipe(
      map(pts => pts.filter(pt => pt.idProject === projectId))
    );
  }

  getTasks(projectId: string): Observable<Task[]> {
    return this.getProjectTasks(projectId).pipe(
      switchMap(projectTasks => {
        return this.http.get<Task[]>(this.urlTask).pipe(
          map(tasks => {
            return tasks.filter(task => projectTasks.some(pt => pt.idTask === task.id));
          })
        );
      })
    );
  }
}
