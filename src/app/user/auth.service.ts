import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';

import { User } from './user2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  public user: User;
  redirectUrl: string;
  private LoginURL = 'http://localhost:8080/user-api/login';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  get isLoggedIn(): boolean {
    return !!this.user
  }


  login(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    user.id = null;
    return this.http.post<User>(this.LoginURL, user, { headers })
      .pipe((map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.user = user;
        return user;
      })))
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.user = null;
    localStorage.clear();
    this.currentUser = null;
    this.currentUserSubject.next(null);
  }


  private handleError(err) {

    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}


