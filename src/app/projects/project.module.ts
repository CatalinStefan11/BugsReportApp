import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list.component';


import { ProjectResolver } from './project-resolver.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectListComponent
      },
     
     
    ])
  ],
  declarations: [
    ProjectListComponent,
   
   
  ]
})
export class ProjectModule { }
