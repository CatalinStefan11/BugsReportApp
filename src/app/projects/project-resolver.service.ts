import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProjectResolved } from './project';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<ProjectResolved> {

  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ProjectResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Project id was not a number: ${id}`;
      console.error(message);
      return of({ project: null, error: message });
    }

    return this.projectService.getProject(+id)
      .pipe(
        map(project => ({ project: project })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ project: null, error: message });
        })
      );


      
  }

}
