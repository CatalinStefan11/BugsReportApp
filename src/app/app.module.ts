import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import {HttpClientJsonpModule} from '@angular/common/http'


/* Feature Modules */
import { UserModule } from './user/user.module';
import { ProjectData } from './projects/project-data';
import { AuthService } from './user/auth.service';
// import { HttpRequestInterceptor } from './httpRequestInterceptor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    // InMemoryWebApiModule.forRoot(ProjectData, { delay: 1000 }),
    UserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
