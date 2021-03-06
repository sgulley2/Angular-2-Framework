﻿import { Component, OnInit } from '@angular/core';
import {
    TaskService,
    SettingsService,
    Task,
    SHARED_PIPES
} from '../shared/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'pomodoro-tasks',
    styleUrls: ['./tasks.component.css'],
    templateUrl: './tasks.component.html'
})
export default class TasksComponent implements OnInit {
    today: Date;
    tasks: Task[];
    queuedPomodoros: number;
    queueHeaderMapping: any;
    timerMinutes: number;

    constructor(
        private taskService: TaskService,
        private settingsService: SettingsService,
        private router: Router ) {
            this.tasks = this.taskService.taskStore;
            this.today = new Date();
            this.queueHeaderMapping = settingsService.pluralsMap.tasks;
            this.timerMinutes = settingsService.timerMinutes;
    }

    ngOnInit(): void {
        this.updateQueuedPomodoros();
        this.taskService.taskFeed.subscribe(newTask => {
            this.tasks.push(newTask);
            this.updateQueuedPomodoros();
        });
    }

    toggleTask(task: Task): void {
        task.queued = !task.queued;
        this.updateQueuedPomodoros();
    }

    private updateQueuedPomodoros(): void {
        this.queuedPomodoros = this.tasks
            .filter((Task: Task) => Task.queued)
            .reduce((pomodoros: number, queuedTask: Task) => {
                return pomodoros + queuedTask.pomodorosRequired;
            }, 0);
    }

    workOn(index: number): void {
        this.router.navigate(['TimerComponent', { id: index }]);
    }
};
