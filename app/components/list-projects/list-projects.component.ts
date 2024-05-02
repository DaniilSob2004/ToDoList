import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css'
})
export class ListProjectsComponent implements OnInit, OnDestroy {
  private projectsSubscription: Subscription | undefined;
  @Output() projectSelected: EventEmitter<Project> = new EventEmitter<Project>();
  projects: Project[] = [];

  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsSubscription = this.projectsService.getProjects(this.usersService.getCookieByAuth())
      .subscribe(response => {
        this.projects = response;
        console.log(this.projects);
      });
  }

  ngOnDestroy(): void {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }

  choiceProject(project: Project): void {
    console.log(project);
    this.projectSelected.emit(project);  // вызываем родительский обработчик
  }
}
