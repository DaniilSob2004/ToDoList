import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from '../../config'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css',
    '../../../register_form.css'
  ]
})
export class SignUpComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription | undefined;
  environment: any = environment;
  form!: FormGroup;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(environment.minNameLength),
        Validators.maxLength(environment.maxNameLength)
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        //Validators.pattern("[-_a-zA-Z\\d]{8,}")
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ]),
      remember: new FormControl('no')
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.userSubscription = this.usersService
      .addUser(this.form.value)
      .subscribe(newUser => {
        this.usersService.signInUser(newUser);
      });
  }

  checkConfirmPassword(): boolean | undefined {
    return (!this.form.get('password')?.touched ||
            this.form.get('password')?.valid &&
            this.form.get('password')?.value === this.form.get('confirmPassword')?.value);
  }
}
