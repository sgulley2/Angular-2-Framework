import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService, TaskService } from '../shared/shared';
import { ActivatedRoute } from '@angular/router';
//&? import { AnimationService, AnimationBuilder } from 'css-animator';

@Component({
    selector: 'pomodoro-timer-widget',
    styleUrls: ['./timer-widget.component.css'],
    template: `
        <div class="text-center">
            <img src="./assets/pomodoro.png"
                [ngClass]="{pulse: !isPaused}">
            <h3><small>{{ taskName }}</small></h3>
            <h1> {{ minutes }}:{{ seconds | number: '2.0' }} </h1>
            <p>
                <button (click)="togglePause()" class="btn btn-danger">
                    {{ buttonLabelKey | i18nSelect: buttonLabelsMap }}
                </button>
            </p>
        </div>`
})
export default class TimerComponent implements OnInit {
    minutes: number;
    seconds: number;
    isPaused: boolean;
    buttonLabelKey: string;
    buttonLabelsMap: any;
    taskName: string;
    //&?fadeInAnimationBuilder: AnimationBuilder;

    constructor(
        private settingsService: SettingsService,
        private activeRoute: ActivatedRoute,
        private taskService: TaskService,
 //&?       private animationService: AnimationService,
        private elementRef: ElementRef) {
        this.buttonLabelsMap = settingsService.labelsMap.timer;
//&?
//        this.fadeInAnimationBuilder = animationService.builder();
//        this.fadeInAnimationBuilder.setDuration(1000)
//            .setDelay(300);
//&?
//            .setFromStyles({ opacity: 0 })
//            .setToStyles({ opacity: 1 });

//&?
    }

    ngOnInit(): void {
        this.resetPomodoro();
        setInterval(() => this.tick(), 1000);

        let taskIndex;
        this.activeRoute.params.subscribe(params => {
           taskIndex = Number.parseInt(params['id']);
           if (!isNaN(taskIndex)) {
               this.taskName = this.taskService.taskStore[taskIndex].name;
           }
        });

//        let taskIndex = parseInt(this.activeRoute.get('id'));
//        if (!isNaN(taskIndex)) {
//            this.taskName = this.taskService.taskStore[taskIndex].name;
//        }
//&?
//        const animation = this.fadeInAnimationBuilder.animate(this.elementRef.nativeElement.firstElementChild)
//            .then(() => console.log('Animation completed!'));
    }

    routerCanReuse(): boolean {
        return true;
    }

    routerOnReuse(): void {
        this.taskName = null;
        this.isPaused = false;
        this.resetPomodoro();
    }

    resetPomodoro(): void {
        this.isPaused = true;
        this.minutes = this.settingsService.timerMinutes - 1;
        this.seconds = 59;
        this.buttonLabelKey = 'start';
    }

    private tick(): void {
        if (!this.isPaused) {
            this.buttonLabelKey = 'pause';

            if (--this.seconds < 0) {
                this.seconds = 59;
                if (--this.minutes < 0) {
                    this.resetPomodoro();
                }
            }
        }
    }

    togglePause(): void {
        this.isPaused = !this.isPaused;
        if (this.minutes < this.settingsService.timerMinutes || this.seconds < 59) {
            this.buttonLabelKey = this.isPaused ? 'resume' : 'pause';
        }
    }
}
