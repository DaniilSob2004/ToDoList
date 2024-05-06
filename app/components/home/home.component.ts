import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignInComponent } from '../sign-in/sign-in.component';
import { ListProjectsComponent } from '../list-projects/list-projects.component';
import { UsersService } from '../../services/users.service';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { ListTasksComponent } from '../list-tasks/list-tasks.component';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SignInComponent,
    ListProjectsComponent,
    FilterPanelComponent,
    ListTasksComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedProject!: Project;
  searchText: string = '';
  searchByValue: string = 'title';

  constructor(public usersService: UsersService) {}

  // обработчик будет передаваться в дочерний элемент и затем вызываться
  onProjectSelected(project: Project): void {
    this.selectedProject = project;
  }
}
