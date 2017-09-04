import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login/login';
import { AppRoutingModule } from './app.routes';
import { TIMER_DIRECTIVES } from './timer/timer';
import { TASKS_DIRECTIVES } from './tasks/tasks';
import { SHARED_PROVIDERS, SHARED_PIPES } from './shared/shared';

//&? - SHARED PROVIDERS DOES NOT WORK --BELOW--
import { AuthenticationService } from './shared/shared';
import { SettingsService } from './shared/shared';
import { TaskService } from './shared/shared';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TIMER_DIRECTIVES,
    TASKS_DIRECTIVES,
    SHARED_PIPES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, SettingsService, TaskService],//SHARED_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
