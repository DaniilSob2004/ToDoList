import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project'

@Component({
  selector: 'app-add-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    ProjectsService
  ],
  templateUrl: './add-project-form.component.html',
  styleUrls: [
    './add-project-form.component.css',
    '../../../register_form.css'
  ]
})
export class AddProjectFormComponent implements OnInit, OnDestroy {
  private projectSubscription: Subscription | undefined;
  @Output() responseAddProject: EventEmitter<Project> = new EventEmitter<Project>();
  form!: FormGroup;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    if (this.projectSubscription) { this.projectSubscription.unsubscribe(); }
  }

  cancelForm(): void {
    this.responseAddProject.emit(undefined);
  }

  onSubmit(): void {
    const { title } = this.form.value;
    this.projectSubscription = this.projectsService.addProject(title)
      .subscribe(project => this.responseAddProject.emit(project));
  }
}
