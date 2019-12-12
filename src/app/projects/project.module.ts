import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list.component';


import { ProjectResolver } from './project-resolver.service';

import { SharedModule } from '../shared/shared.module';
import { ProjectEditComponent } from './projects-edit/project-edit.component';
import { ProjectEditGuard } from './projects-edit/project-edit.guard';
import { ProjectEditInfoComponent } from './projects-edit/project-edit-info.component';
import { ProjectEditTagsComponent } from './projects-edit/project-edit-tags.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectListComponent
      },
  
      {
        path: ':id/edit',
        component: ProjectEditComponent,
        canDeactivate: [ProjectEditGuard],
        resolve: { resolvedData: ProjectResolver },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProjectEditInfoComponent},
          { path: 'tags', component: ProjectEditTagsComponent}
        ]
      }
     
    ])
  ],
  declarations: [
    ProjectListComponent,
    ProjectEditComponent,
    ProjectEditInfoComponent,
    ProjectEditTagsComponent ,
   
   
  ]
})
export class ProjectModule { }
