import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

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
export class UserAccountNavComponent implements OnInit, OnDestroy {
  private currentUserSubscription: Subscription | undefined;
  userName: string | undefined;
  
  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    // подписка на изменения текущего пользователя и обновление userName
    this.currentUserSubscription = UserService.CurrentUser$
      .subscribe(user => this.userName = user ? `, ${user.name}` : '');
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) { this.currentUserSubscription.unsubscribe(); }
  }

  checkAuthorization(): boolean {
    return UserService.isLoggedIn();
  }
}
