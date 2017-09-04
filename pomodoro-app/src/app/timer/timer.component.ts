import { Component } from '@angular/core';
//&?import { Routes } from '@angular/router';

@Component({
    selector: 'pomodoro-timer',
//&?    template: '<router-outlet></router-outlet>'
    template: '<pomodoro-timer-widget></pomodoro-timer-widget>'
})
export default class TimerComponent { }