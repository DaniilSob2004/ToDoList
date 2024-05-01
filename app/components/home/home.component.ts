import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { SignInComponent } from '../sign-in/sign-in.component';
import { ListProjectsComponent } from '../list-projects/list-projects.component';
import { UserService } from '../../services/user.service';
import { UsersService } from '../../services/users.service';

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
  constructor(private router: Router, private usersService: UsersService) {}

  checkAuthorization(): boolean {
    const isAuthCookie = this.usersService.getCookieByAuth();
    const isAuth = UserService.isLoggedIn();
  
    if (!isAuth && !isAuthCookie) {
      this.router.navigate(['/sign-in']);
      return false;
    }
  
    return true;
  }
}
