import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../interfaces/user'
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../config'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router) {
      this.setCurrentUser();  // установка текущего пользователя в сервисе
  }

  private getRandomInt(min: number = 10, max: number = 100000000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  setCurrentUser(): void {
    this.getUserbyId(this.getCookieByAuth())
    .subscribe(user => {
      UserService.setCurrentUser(user);
    });
  }

  logoutUser(): void {
    this.deleteCookieByAuth();
    UserService.logout();
    this.router.navigate(['/sign-in']);
  }

  signInUser(user: User): void {
    this.setCookieByAuth(user.id);  // сохранение куки
    UserService.setCurrentUser(user);  // установка текущего пользователя
    this.router.navigate(['/']);  // перенапрвление
  }

  isAuthorizedUser(): boolean {
    const userId = this.getCookieByAuth();
    const isAuth = UserService.isLoggedIn();
  
    // дополнительно проверяется и cookie, т.к. при обновлении страницы, не сразу
    // получаем корректные данные по свойству isAuth
    if (!isAuth && !userId) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    return true;
  }


  setCookieByAuth(userId: string): void {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (10 * 60 * 1000));
    this.cookieService.set(environment.authorizeCookieName, userId, expiryDate);
  }

  getCookieByAuth(): string {
    return this.cookieService.get(environment.authorizeCookieName);
  }

  deleteCookieByAuth(): void {
    this.cookieService.delete(environment.authorizeCookieName);
  }

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserbyId(id: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  getUser(email: string, password: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.email === email && user.password === password))
    );
  }

  addUser(user: User): Observable<User> {
    const { name, email, password, remember } = user;
    const id = this.getRandomInt().toString();
    return this.http.post<User>(this.url, { id, name, email, password, remember });
  }
}
