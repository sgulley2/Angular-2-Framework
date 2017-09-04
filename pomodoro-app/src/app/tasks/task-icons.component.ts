import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../shared/shared';

@Component({
    selector: 'pomodoro-task-icons',
    template: `<img *ngFor="let icon of icons"
                   src='./assets/pomodoro.png'
                   width="{{size}}">`
})
export default class TaskIconsComponent implements OnInit {
    @Input() task: Task;
    @Input() size: number;
    icons: Object[] = [];

    ngOnInit() {
        this.icons.length = this.task.pomodorosRequired;
        this.icons.fill({ name: this.task.name });
    }
}
