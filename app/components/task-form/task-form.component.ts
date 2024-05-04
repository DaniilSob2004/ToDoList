import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Priority, Task } from '../../interfaces/task';
import { DateTimeWork } from '../../shared/datetimeWork';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    TasksService
  ],
  templateUrl: './task-form.component.html',
  styleUrls: [
    './task-form.component.css',
    '../../../register_form.css'
  ]
})
export class TaskFormComponent implements OnInit, OnDestroy {
  private taskSubscription: Subscription | undefined;
  @Output() responseCreateTask: EventEmitter<Task> = new EventEmitter<Task>();
  form!: FormGroup;
  priorityArr: string[];

  constructor(private tasksService: TasksService) {
    this.priorityArr = Object.keys(Priority);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      priority: new FormControl('Low')
    });
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) { this.taskSubscription.unsubscribe(); }
  }

  cancelForm(): void {
    this.responseCreateTask.emit(undefined);
  }

  onSubmit(): void {
    const { title, date, time, description, tags, priority } = this.form.value;
    const task: Task = {
      id: '',
      title: title,
      targetTime: DateTimeWork.getMsByDateTimeStr(date, time),
      description: description,
      tags: tags.split(',').map((tag: string) => tag.trim()),
      priority: priority
    };
    console.log(task.tags);
    this.taskSubscription = this.tasksService.addTask(task)
      .subscribe(task => {
        this.responseCreateTask.emit(task);
      });
  }
}
