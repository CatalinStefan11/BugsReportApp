import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { User } from './user2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:8080/user-api/users';

  constructor(private http: HttpClient) { }



  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.URL)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<User> {
    if (id === 0) {
      return of(this.initializeUser());
    }
    const url = `${this.URL}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    user.id = null;
    return this.http.post<User>(this.URL, user, { headers })
      .pipe(
        tap(data => console.log('createUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
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

  private initializeUser(): User {
    return {
      id: 0,
      email: null,
      password: null
    };
  }
}
