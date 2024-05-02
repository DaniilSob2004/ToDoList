import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) { }

  getProjects(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.url).pipe(
      map(projects => projects.filter(project => project.idUser === userId))
    );
  }
}
