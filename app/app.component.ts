import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { UserAccountNavComponent } from './components/user-account-nav/user-account-nav.component';
import { UsersService } from './services/users.service';
import { ProjectsService } from './services/projects.service';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    UserAccountNavComponent
  ],
  providers: [
    UsersService,
    ProjectsService,
    TasksService
  ],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../register_form.css'
  ]
})
export class AppComponent {

}
