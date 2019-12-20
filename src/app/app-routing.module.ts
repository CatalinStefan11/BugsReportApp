import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        data: { preload: false },
        loadChildren: () => 
          import('./projects/project.module').then(m => m.ProjectModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ], { enableTracing: true, preloadingStrategy: SelectiveStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
