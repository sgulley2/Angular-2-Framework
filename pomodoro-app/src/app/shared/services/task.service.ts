import { Injectable } from '@angular/core';
import { Task } from '../shared';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export default class TaskService {
    taskStore: Task[] = [];
    taskFeed: Observable<Task>;
    private taskObserver: any;
    private dataUrl = '../data/raw-tasks.json';
    
    constructor(private http: Http) {
        this.taskFeed = new Observable(observer => {
            this.taskObserver = observer;
        });
//&?        this.fetchTasks();

        const tasks =
            [{
                "name": "Code an HTML Table",
                "deadline": "Jun 23 2015",
                "pomodorosRequired": 1
            },
                {
                    "name": "Sketch a wireframe for the new homepage",
                    "deadline": "Jun 24 2016",
                    "pomodorosRequired": 2
                },
                {
                    "name": "Style table with Bootstrap styles",
                    "deadline": "Jun 25 2016",
                    "pomodorosRequired": 1
                },
                {
                    "name": "Reinforce SEO with custom sitemap.xml",
                    "deadline": "Jun 26 2016",
                    "pomodorosRequired": 3
                }];

        this.taskStore = tasks.map(task => {
            return {
                name: task.name,
                deadline: new Date(task.deadline),
                queued: false,
                pomodorosRequired: task.pomodorosRequired
            };
        });
    }
//&?
/*    
    private fetchTasks(): void {
        this.http.get(this.dataUrl)
            .map(response => response.json())
            .map(stream => stream.map(res => {
                return {
                    name: res.name,
                    deadline: new Date(res.deadline),
                    pomodorosRequired: res.pomodorosRequired,
                    queued: res.queued
                }
            }))
            .subscribe(
            tasks => {
                this.taskStore = tasks;
                tasks.forEach(task => this.taskObserver.next(task))
            },
            error => console.log(error)
            );
    }
*/
    addTask(task: Task): void {
        this.taskObserver.next(task);
    }
}