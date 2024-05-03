import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Project } from '../interfaces/project';
import { getRandomInt } from '../shared/random';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url = 'http://localhost:3000/projects/';

  constructor(
    private http: HttpClient,
    private usersService: UsersService) { }

  getProjects(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.url).pipe(
      map(projects => projects.filter(project => project.idUser === userId))
    );
  }

  addProject(title: string): Observable<Project> {
    const id = getRandomInt().toString();
    const idUser = this.usersService.getCookieByAuth();
    return this.http.post<Project>(this.url, { id, idUser, title });
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.url}${id}`);
  }

  changeProject(project: Project, newTitle: string): Observable<Project> {
    project.title = newTitle;
    return this.http.put<Project>(`${this.url}${project.id}`, project);
  }
}
