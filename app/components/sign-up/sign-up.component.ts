import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../../config'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
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
export class SignUpComponent {
  environment: any = environment;
  form!: FormGroup;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
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
        Validators.pattern("[-_a-zA-Z\\d]{8,}")
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ]),
      remember: new FormControl('no')
    });
  }

  onSubmit(): void {
    this.usersService
        .addUser(this.form.value)
        .subscribe(
          response => { console.log(response) }
        );
  }

  checkConfirmPassword(): boolean | undefined {
    return (!this.form.get('password')?.touched ||
            this.form.get('password')?.valid &&
            this.form.get('password')?.value === this.form.get('confirmPassword')?.value);
  }
}
