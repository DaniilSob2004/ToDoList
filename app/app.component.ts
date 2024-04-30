import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { UserAccountNavComponent } from './components/user-account-nav/user-account-nav.component';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    UserAccountNavComponent
  ],
  providers: [
    UsersService
  ],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../register_form.css'
  ]
})
export class AppComponent {
  constructor(
    private usersService: UsersService,
    private router: Router) {}

  ngOnInit(): void {
    console.log("APP ROOT: " + this.usersService.getCookieByAuth());
      // получение текущего пользователя и установка его в сервисе
      this.usersService.getUserbyId(this.usersService.getCookieByAuth())
      .subscribe(user => {
        UserService.setCurrentUser(user);
      });
  }
}
