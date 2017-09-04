import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export default class AuthenticationService {
    http: Http;
    userIsLoggedIn: EventEmitter<boolean>;

    constructor() {
//&?
debugger
        this.userIsLoggedIn = new EventEmitter();
    }

    httpLogin(credentials): Promise<boolean> {
        return new Promise(resolve => {
            const url = '/api/authentication'; // Or your own API Auth url
            const body = JSON.stringify(credentials);
            const headers = new Headers({ 'Content-Type': 'application/json' });
            const options = new RequestOptions({ headers: headers });

            this.http.post(url, body, options)
                .map(response => response.json())
                .subscribe(authResponse => {
                    let validCredentials: boolean = false;

                    if (authResponse && authResponse.token) {
                        validCredentials = true;
                        window.sessionStorage.setItem('token', authResponse.token);
                    }

                    this.userIsLoggedIn.emit(validCredentials);
                    resolve(validCredentials);
                },
                error => console.log(error)
                );
        });
    }

    login({username, password}): Promise<boolean> {
        return new Promise(resolve => {
            let validCredentials: boolean = false;

            // @NOTE: In a real scenario this check
            // should be performed against a web service:
            if (username === 'john@doemail.com' &&
                password === 'letmein') {
                validCredentials = true;
                window.sessionStorage.setItem('token', 'eyJhbGciOi');
            }

            this.userIsLoggedIn.emit(validCredentials);
            resolve(validCredentials);
        });
    }

    logout(): Promise<boolean> {
        return new Promise(resolve => {
            window.sessionStorage.removeItem('token');
            this.userIsLoggedIn.emit(false);
            resolve(true);
        });
    }

    static isAuthorized(): boolean {
        return !!window.sessionStorage.getItem('token');
    }
}