import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static currentUserSubject = new BehaviorSubject<User | undefined>(undefined);
  static CurrentUser$ = UserService.currentUserSubject.asObservable();

  static setCurrentUser(user: User | undefined): void {
    UserService.currentUserSubject.next(user);
  }

  static isLoggedIn(): boolean {
    return !!UserService.currentUserSubject.value;
  }

  static logout(): void {
    UserService.currentUserSubject.next(undefined);
  }
}
