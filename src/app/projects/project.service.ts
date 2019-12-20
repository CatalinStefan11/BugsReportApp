import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Project, Project2 } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'http://localhost:8080/project-api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project2[]> {
    return this.http.get<Project2[]>(this.projectsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProject(id: number): Observable<Project> {
    if (id === 0) {
      return of(this.initializeProject());
    }
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url)
      .pipe(
        tap(data => console.log('getProject: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createProject(Project: Project): Observable<Project> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    Project.id = null;
    return this.http.post<Project>(this.projectsUrl, Project, { headers })
      .pipe(
        tap(data => console.log('createProject: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProject(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete<Project>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProject: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProject(Project: Project): Observable<Project> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.projectsUrl}/${Project.id}`;
    return this.http.put<Project>(url, Project, { headers })
      .pipe(
        tap(() => console.log('updateProject: ' + Project.id)),
        map(() => Project),
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

  private initializeProject(): Project {
    return {
      id: 0,
      projectName: null,
      description: null,
      projectRepo: null,
    };
  }
}
