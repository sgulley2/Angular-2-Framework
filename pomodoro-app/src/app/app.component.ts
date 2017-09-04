import { Component } from '@angular/core';
import { AuthenticationService } from './shared/shared';
import { Router } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [`.router-link-active { font-weight: bold; border-bottom: 2px #d9534f solid; }`]
})
export class AppComponent {
    title = 'Hello World!';
    userIsLoggedIn: boolean;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) {
        authenticationService.userIsLoggedIn.subscribe(isLoggedIn => {
            this.userIsLoggedIn = isLoggedIn;
        });
    }

    logout($event): void {
        $event.preventDefault();

        this.authenticationService.logout().then(success => {
            if (success) {
                this.router.navigateByUrl('/');
            }
        });
    }
}
