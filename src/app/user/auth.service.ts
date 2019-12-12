import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User2 } from './user2';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Content-Type':'application/json'
      
    })
  };

  constructor(private http: HttpClient) { }

  login(userName: string, password: string): void {
    if (!userName || !password) {
     
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
    
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
   
  }

  logout(): void {
    this.currentUser = null;
  }
  
  private URL = 'http://localhost:8080/user-api/users';



  getUsers(): Observable<User2[]> {
 
    
    return this.http.get<User2[]>(this.URL, this.httpOptions)
    
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  
  getUser(id: number): Observable<User2> {
    if (id === 0) {
      return of(this.initializeUser());
    }
    const url = `${this.URL}/${id}`;
    return this.http.get<User2>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createUser(user: User2): Observable<User2> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    user.id = null;
    return this.http.post<User2>(this.URL, user, { headers })
      .pipe(
        tap(data => console.log('createUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteUser(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.URL}/${id}`;
    return this.http.delete<User2>(url, { headers })
      .pipe(
        tap(data => console.log('deleteUser: ' + id)),
        catchError(this.handleError)
      );
  }

  updateUser(User: User2): Observable<User2> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.URL}/${User.id}`;
    return this.http.put<User2>(url, User, { headers })
      .pipe(
        tap(() => console.log('updateUser: ' + User.id)),
        map(() => User),
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

  private initializeUser(): User2 {
    return {
      id: 0,
      email: null,
      password: null
    };
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private URL = 'api/users';

//   constructor(private http: HttpClient) { }

//   getUsers(): Observable<User2[]> {
//     return this.http.get<User2[]>(this.URL)
//       .pipe(
//         tap(data => console.log(JSON.stringify(data))),
//         catchError(this.handleError)
//       );
//   }

//   getUser(id: number): Observable<User2> {
//     if (id === 0) {
//       return of(this.initializeUser());
//     }
//     const url = `${this.URL}/${id}`;
//     return this.http.get<User2>(url)
//       .pipe(
//         tap(data => console.log('getUser: ' + JSON.stringify(data))),
//         catchError(this.handleError)
//       );
//   }

//   createUser(user: User2): Observable<User2> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     user.id = null;
//     return this.http.post<User2>(this.URL, user, { headers })
//       .pipe(
//         tap(data => console.log('createUser: ' + JSON.stringify(data))),
//         catchError(this.handleError)
//       );
//   }

//   deleteUser(id: number): Observable<{}> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     const url = `${this.URL}/${id}`;
//     return this.http.delete<User2>(url, { headers })
//       .pipe(
//         tap(data => console.log('deleteUser: ' + id)),
//         catchError(this.handleError)
//       );
//   }

//   updateUser(User: User2): Observable<User2> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     const url = `${this.URL}/${User.id}`;
//     return this.http.put<User2>(url, User, { headers })
//       .pipe(
//         tap(() => console.log('updateUser: ' + User.id)),
//         map(() => User),
//         catchError(this.handleError)
//       );
//   }

//   private handleError(err) {

//     let errorMessage: string;
//     if (err.error instanceof ErrorEvent) {

//       errorMessage = `An error occurred: ${err.error.message}`;
//     } else {
//       errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
//     }
//     console.error(err);
//     return throwError(errorMessage);
//   }

//   private initializeUser(): User2 {
//     return {
//       id: 0,
//       userName: null,
//       password: null
//     };
//   }
// }
