import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Output() responseForTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() editTaskObj: Task | undefined = undefined;
  form!: FormGroup;
  priorityArr: string[];

  constructor(private tasksService: TasksService) {
    this.priorityArr = Object.keys(Priority);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      priority: new FormControl('')
    });

    if (this.editTaskObj) {
      const formatDate = DateTimeWork.getDateWithoutTime(this.editTaskObj.targetTime);
      const formatTime = DateTimeWork.getTimeWithoutDate(this.editTaskObj.targetTime);
      
      this.form.patchValue({
        id: this.editTaskObj.id,
        title: this.editTaskObj.title,
        date: formatDate,
        time: formatTime,
        description: this.editTaskObj.description,
        tags: this.editTaskObj.tags.join(','),
        priority: this.editTaskObj.priority
      });
    }
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) { this.taskSubscription.unsubscribe(); }
  }

  cancelForm(): void {
    this.responseForTask.emit(undefined);
  }

  onSubmit(): void {
    const { id, title, date, time, description, tags, priority } = this.form.value;
    const task: Task = {
      id: id,
      title: title,
      targetTime: DateTimeWork.getMsByDateTimeStr(date, time),
      description: description,
      tags: tags.split(',').map((tag: string) => tag.trim()),
      priority: priority
    };

    if (!this.editTaskObj) {
      this.taskSubscription = this.tasksService.addTask(task)
      .subscribe(task => {
        this.responseForTask.emit(task);
      });
    }
    else {
      this.responseForTask.emit(task);
    }
  }
}
