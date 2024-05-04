import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project';
import { UsersService } from '../../services/users.service';
import { AddProjectFormComponent } from '../add-project-form/add-project-form.component';
import { TasksService } from '../../services/tasks.service';
import { ProjectTasksService } from '../../services/project-tasks.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddProjectFormComponent,
    ContextMenuComponent
  ],
  providers: [
    TasksService,
    ProjectTasksService,
    UsersService,
    ProjectsService
  ],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css'
})
export class ListProjectsComponent implements OnInit, OnDestroy {
  private projectsSubscription: Subscription | undefined;
  private tasksSubscription: Subscription | undefined;
  private projectTasksSubscription: Subscription | undefined;
  private editProjectSubscription: Subscription | undefined;
  
  @Output() projectSelected: EventEmitter<Project> = new EventEmitter<Project>();
  projects: Project[] = [];
  selectedProject: Project | undefined = undefined;
  contextMenuProject: Project | undefined = undefined;
  contextMenuCoords: any | undefined = undefined;  // x, y
  isCreateProject: boolean = false;
  isEditProject: boolean = false;
  editTextProject: string = '';

  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private tasksService: TasksService,
    private projectTasksService: ProjectTasksService) {}

  ngOnInit(): void {
    this.projectsSubscription = this.projectsService.getProjects(this.usersService.getCookieByAuth())
      .subscribe(response => {
        this.projects = response;
        console.log(this.projects);
      });
  }

  ngOnDestroy(): void {
    if (this.projectsSubscription) { this.projectsSubscription.unsubscribe(); }
    if (this.tasksSubscription) { this.tasksSubscription.unsubscribe(); }
    if (this.projectTasksSubscription) { this.projectTasksSubscription.unsubscribe(); }
    if (this.editProjectSubscription) { this.editProjectSubscription.unsubscribe(); }
  }

  onSelectedProject(project: Project | undefined): void {
    if (!this.isEditProject) {
      this.selectedProject = project;
      this.projectSelected.emit(project);
    }
  }

  responseAddProject(project: Project | undefined) {
    this.isCreateProject = false;
    if (project) { this.projects.push(project); }
  }

  // Context menu
  onContextMenu(event: any, project: Project): void {
    event.preventDefault();
    this.contextMenuProject = project;
    this.contextMenuCoords = { x: event.pageX, y: event.pageY };
  }

  onIsEditProject(): void {
    if (this.contextMenuProject) {
      this.isEditProject = true;
      this.editTextProject = this.contextMenuProject.title;
      this.contextMenuCoords = undefined;
    }
  }

  editProject(): void {
    if (this.contextMenuProject) {
      this.editProjectSubscription = this.projectsService
        .changeProject(this.contextMenuProject, this.editTextProject)
        .subscribe(() => this.isEditProject = false);
    }
  }

  deleteProject(): void {
    if (this.contextMenuProject) {
      const projectId = this.contextMenuProject.id;

      // удаление все задач связанных с этим проектом
      this.tasksSubscription = this.tasksService.deleteTasks(projectId)
        .subscribe(tasks => console.log(tasks));

      // удаление связей из таблицы Project-Tasks
      this.projectTasksSubscription = this.projectTasksService.deleteProjectTasks(projectId)
        .subscribe(ptList => console.log(ptList));
      
      // удаление проекта
      this.projectsService.deleteProject(projectId)
        .subscribe(delProject => {
          this.projects = this.projects.filter(proj => proj.id !== delProject.id);
          if (delProject.id === this.selectedProject?.id) {
            this.projectSelected.emit(undefined);
            this.contextMenuProject = undefined;
          }
        });

      this.contextMenuCoords = undefined;
    }
  }
}
