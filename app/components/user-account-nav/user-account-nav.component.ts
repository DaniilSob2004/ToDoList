import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { UsersService } from '../../services/users.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-account-nav',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    UsersService
  ],
  templateUrl: './user-account-nav.component.html',
  styleUrls: [
    './user-account-nav.component.css',
    '../../../register_form.css'
  ]
})
export class UserAccountNavComponent {
  userName: string | undefined;

  constructor(
    private usersService: UsersService,
    private router: Router) {}

  ngOnInit(): void {
    // подписка на изменения текущего пользователя и обновление userName
    UserService.currentUser$.subscribe(user => {
      this.userName = user?.name;
    });
  }

  checkAuthorization(): boolean {
    return UserService.isLoggedIn();
  }

  signOut(): void {
    this.usersService.deleteCookieByAuth();
    UserService.logout();
    this.router.navigate(['/sign-in']);
  }
}
