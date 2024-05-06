import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: [
    './sign-in.component.css',
    '../../../register_form.css'
  ]
})
export class SignInComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription | undefined;
  form!: FormGroup;
  isValid: boolean = true;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // если пользователь авторизован и он попал на sign-in, то выходим из аккаунта
    if (this.usersService.isAuthorizedUser()) {
      this.usersService.logoutUserWithoutRoute();
    }
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl('no')
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.userSubscription = this.usersService
      .getUser(email, password)
      .subscribe(user => {
        if (user) { this.usersService.signInUser(user); }
        else { this.isValid = false; }
      });
  }
}
