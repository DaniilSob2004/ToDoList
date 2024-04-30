import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static currentUserSubject = new BehaviorSubject<User | undefined>(undefined);
  static currentUser$ = UserService.currentUserSubject.asObservable();

  static setCurrentUser(user: User | undefined): void {
    UserService.currentUserSubject.next(user);
  }

  static isLoggedIn(): boolean {
    return !!UserService.currentUserSubject.value;
  }

  static logout(): void {
    UserService.currentUserSubject.next(undefined);
  }

  /*static checkAuthorization(router: Router): boolean {
    if (!UserService.isLoggedIn()) {
      router.navigate(['/sign-in']);
    }
    return UserService.isLoggedIn();
  }*/
}
