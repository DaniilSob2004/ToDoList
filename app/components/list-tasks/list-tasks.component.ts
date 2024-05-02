import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../../interfaces/task';
import { Project } from '../../interfaces/project';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent implements OnChanges, OnDestroy {
  private tasksSubscription: Subscription | undefined;
  @Input() selectedProject!: Project;
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnChanges(): void {
    if (this.selectedProject) {
      this.tasksSubscription = this.tasksService.getTasks(this.selectedProject.id)
        .subscribe(tasks => {
          this.tasks = tasks;
          console.log(this.tasks);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }
}
