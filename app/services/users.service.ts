import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { User } from '../interfaces/user'
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../config'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) {}

  private getRandomInt(min: number = 100, max: number = 100000000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setCookieByAuth(userId: string): void {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (1 * 60 * 1000));  // 1 мин
    this.cookieService.set(environment.authorizeCookieName, userId, expiryDate);
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
