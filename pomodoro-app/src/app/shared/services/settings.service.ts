import { Injectable } from '@angular/core';

@Injectable()
export default class SettingsService {
    timerMinutes: number;
    labelsMap: any;
    pluralsMap: any;

    sitecoreDatabase: any;

    constructor() {
        this.timerMinutes = 25;
        this.labelsMap = {
            'timer': {
                'start': 'Start Timer',
                'pause': 'Pause Timer',
                'resume': 'Resume Countdown',
                'other': 'Unknown'
            }
        };
        this.pluralsMap = {
            'tasks': {
                '=0': 'No pomodoros',
                '=1': 'One pomodoro',
                'other': '# pomodoros'
            }
        };

//&?
        this.sitecoreDatabase = JSON.parse(window.sessionStorage.getItem("SiteCore_Database"));
    }
}