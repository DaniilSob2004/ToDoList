import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

import { ProjectTask } from '../interfaces/project-task';

@Injectable({
  providedIn: 'root'
})
export class ProjectTasksService {
  url = 'http://localhost:3000/project-tasks/';

  constructor(private http: HttpClient) { }

  getProjectTasks(projectId: string): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(this.url).pipe(
      map(pts => pts.filter(pt => pt.idProject === projectId))
    );
  }

  deleteProjectTask(id: string): Observable<ProjectTask> {
    return this.http.delete<ProjectTask>(`${this.url}${id}`);
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
