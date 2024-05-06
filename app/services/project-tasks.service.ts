import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

import { ProjectTask } from '../interfaces/project-task';
import { getRandomInt } from '../shared/random';

@Injectable({
  providedIn: 'root'
})
export class ProjectTasksService {
  url = 'http://localhost:3000/project-tasks/';

  constructor(private http: HttpClient) { }

  getProjectTaskByTaskId(taskId: string): Observable<ProjectTask | undefined> {
    return this.http.get<ProjectTask[]>(this.url).pipe(
      map(pts => pts.find(pt => pt.idTask === taskId))
    );
  }

  getProjectTasks(projectId: string): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(this.url).pipe(
      map(pts => pts.filter(pt => pt.idProject === projectId))
    );
  }

  addProjectTask(idProject: string, idTask: string): Observable<ProjectTask> {
    const id = getRandomInt().toString();
    return this.http.post<ProjectTask>(this.url, { id, idProject, idTask });
  }

  deleteProjectTask(id: string): Observable<ProjectTask> {
    return this.http.delete<ProjectTask>(`${this.url}${id}`);
  }

  deleteProjectTaskByTaskId(taskId: string): Observable<ProjectTask | undefined> {
    return this.getProjectTaskByTaskId(taskId).pipe(
      switchMap(projectTask => {
        if (projectTask) { return this.deleteProjectTask(projectTask.id); }
        else { return of(void 0); }
      })
    );
  }

  deleteProjectTasks(projectId: string): Observable<ProjectTask[]> {
    return this.getProjectTasks(projectId).pipe(
      switchMap(projectTasks => {
        const deleteObservables: Observable<ProjectTask>[] = [];
        projectTasks.forEach(pTask => {
          deleteObservables.push(this.deleteProjectTask(pTask.id));
        });
        return forkJoin(deleteObservables);
      })
    );
  }
}
