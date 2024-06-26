import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../../interfaces/task';
import { Project } from '../../interfaces/project';
import { TasksService } from '../../services/tasks.service';
import { ProjectTasksService } from '../../services/project-tasks.service';
import { DtStrByMsPipe } from '../../pipes/dt-str-by-ms.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    DtStrByMsPipe,
    FilterPipe,
    TaskFormComponent,
    ContextMenuComponent
  ],
  providers: [
    TasksService,
    ProjectTasksService,
  ],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent implements OnChanges, OnDestroy {
  private tasksSubscription: Subscription | undefined;
  private projectTaskSubscription: Subscription | undefined;
  private projectTaskDelSubscription: Subscription | undefined;
  private taskDelSubscription: Subscription | undefined;
  private taskEditSubscription: Subscription | undefined;

  @Input() selectedProject: Project | undefined;
  @Input() searchText: string = '';
  @Input() searchByValue: string = '';

  tasks: Task[] = [];
  contextMenuTask: Task | undefined = undefined;
  contextMenuCoords: any | undefined = undefined;  // x, y
  isCreateTask: boolean = false;
  isEditTask: boolean = false;

  constructor(
    private tasksService: TasksService,
    private projectTasksService: ProjectTasksService) {}

  ngOnChanges(): void {
    if (this.selectedProject) {
      this.tasksSubscription = this.tasksService
        .getTasks(this.selectedProject.id)
        .subscribe(tasks => this.tasks = tasks);
    }
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) { this.tasksSubscription.unsubscribe(); }
    if (this.projectTaskSubscription) { this.projectTaskSubscription.unsubscribe(); }
    if (this.projectTaskDelSubscription) { this.projectTaskDelSubscription.unsubscribe(); }
    if (this.taskDelSubscription) { this.taskDelSubscription.unsubscribe(); }
    if (this.taskEditSubscription) { this.taskEditSubscription.unsubscribe(); }
  }

  responseCreateTask(task: Task) {
    this.isCreateTask = false;
    if (task && this.selectedProject) {
      this.projectTaskSubscription = this.projectTasksService
        .addProjectTask(this.selectedProject.id, task.id)
        .subscribe(() => this.tasks.push(task));
    }
  }

  // Context menu
  onContextMenu(event: any, task: Task): void {
    event.preventDefault();
    this.contextMenuTask = task;
    this.contextMenuCoords = { x: event.pageX, y: event.pageY };
  }

  onIsEditTask(): void {
    if (this.contextMenuTask) {
      this.isEditTask = true;
      this.contextMenuCoords = undefined;
    }
  }

  responseEditTask(task: Task | undefined) {
    this.isEditTask = false;
    if (this.contextMenuTask && task) {
      this.taskEditSubscription = this.tasksService
        .changeTask(this.contextMenuTask, task)
        .subscribe(() => this.isEditTask = false);
    }
  }

  deleteTask(): void {
    if (this.contextMenuTask) {
      const taskId = this.contextMenuTask.id;

      // удаление из таблицы Project-Tasks
      this.projectTaskDelSubscription = this.projectTasksService.deleteProjectTaskByTaskId(taskId)
        .subscribe(projectTask => console.log(projectTask));

      // удаление задачи
      this.taskDelSubscription = this.tasksService.deleteTask(taskId)
        .subscribe(delTask => this.tasks = this.tasks.filter(task => task.id !== delTask.id));

      this.contextMenuCoords = undefined;
    }
  }
}
