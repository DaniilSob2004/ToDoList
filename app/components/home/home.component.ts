import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { SignInComponent } from '../sign-in/sign-in.component';
import { ListProjectsComponent } from '../list-projects/list-projects.component';
import { UserService } from '../../services/user.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SignInComponent,
    ListProjectsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  checkAuthorization(): Observable<boolean> {
    return UserService.currentUser$.pipe(
      map(user => !!user)
    );
  }
}
