import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../config'
import { SignInComponent } from '../sign-in/sign-in.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SignInComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isAuthorized$ = new BehaviorSubject<boolean>(false);

  constructor(
    private cookieService: CookieService,
    private router: Router) {}

  ngOnInit(): void {
    this.checkAuthorization();
  }

  private checkAuthorization(): void {
    const isAuthorize = this.cookieService.get(environment.authorizeCookieName);
    this.isAuthorized$.next(!!isAuthorize);

    if (!isAuthorize) {
      this.router.navigate(['/sign-in']);
    }
  }
}
