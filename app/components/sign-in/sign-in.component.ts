import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: [
    './sign-in.component.css',
    '../../../register_form.css'
  ]
})
export class SignInComponent {
  form!: FormGroup;
  isValid: boolean = true;

  constructor(
    private usersService: UsersService,
    private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl('no')
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.usersService.getUser(email, password)
      .subscribe(user => {
        if (user) {
          console.log(user);
          this.usersService.setCookieByAuth(user.id);  // сохранение куки
          this.router.navigate(['/']);  // перенапрвление
        }
        else {
          this.isValid = false;
        }
      });
  }
}
