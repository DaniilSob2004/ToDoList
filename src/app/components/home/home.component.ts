import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../config'
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SignInComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private cookieservice: CookieService) {}

  isAuthorize(): boolean {
    const isAuthorize = this.cookieservice.get(environment.authorizeCookieName);
    return isAuthorize !== '';
  }
}
