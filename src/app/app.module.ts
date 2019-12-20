import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import {HttpClientJsonpModule} from '@angular/common/http'


import { UserModule } from './user/user.module';

// import { HttpRequestInterceptor } from './httpRequestInterceptor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    UserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    
  
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
