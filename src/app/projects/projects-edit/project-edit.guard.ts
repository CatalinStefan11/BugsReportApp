import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectEditComponent } from './project-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectEditGuard implements CanDeactivate<ProjectEditComponent>  {

  canDeactivate(component: ProjectEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (component.isDirty) {
      const projectName = component.project.projectName || 'New Project';
      return confirm(`Navigate away and lose all changes to ${projectName}?`);
    }
    return true;
  }

}
