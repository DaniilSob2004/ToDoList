import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project';
import { UsersService } from '../../services/users.service';
import { AddProjectFormComponent } from '../add-project-form/add-project-form.component';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [
    CommonModule,
    AddProjectFormComponent
  ],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css'
})
export class ListProjectsComponent implements OnInit, OnDestroy {
  private projectsSubscription: Subscription | undefined;
  @Output() projectSelected: EventEmitter<Project> = new EventEmitter<Project>();
  projects: Project[] = [];
  selectedProject: Project | undefined = undefined;
  isCreateProject: boolean = false;

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

  onSelectedProject(project: Project): void {
    this.selectedProject = project;
    this.projectSelected.emit(project);
  }

  successAddProject(project: Project) {
    console.log(project);
    this.isCreateProject = false;
    this.projects.push(project);
  }
}
