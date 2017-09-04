import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerComponent } from './timer/timer';
import { LoginComponent } from './login/login';
import { TasksComponent, TaskEditorComponent } from './tasks/tasks';


const appRoutes: Routes = [
    { path: 'TasksComponent', component: TasksComponent },
    { path: 'TimerComponent', component: TimerComponent },
    { path: 'LoginComponent', component: LoginComponent },
    { path: 'TaskEditorComponent', component: TaskEditorComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}