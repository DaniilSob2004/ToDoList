import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User[]> {
    const { name, email, password, remember } = user;
    return this.http.post<any[]>(this.url, { name, email, password, remember });
  }
}
