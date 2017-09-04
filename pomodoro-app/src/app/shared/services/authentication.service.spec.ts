import AuthenticationService from './authentication.service';
import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import Testbed from '@angular/core/testing';
import 'rxjs/add/operator/map'

describe('shared:AuthenticationService', () => {
    let authenticationService: AuthenticationService;
    let mockBackend: MockBackend;

//&?
/*
    beforeEachProviders(() => [
        MockBackend,
        BaseRequestOptions,
        provide(Http, {
            useFactory: (
                backend: MockBackend,
                options: BaseRequestOptions
            ) => {
                return new Http(backend, options);
            },
            deps: [MockBackend, BaseRequestOptions]
        }),
        AuthenticationService
    ]);
*/
    beforeEach(inject(
        [MockBackend, AuthenticationService],
        (_mockBackend, _authenticationService) => {
            authenticationService = _authenticationService;
            mockBackend = _mockBackend;
        }
    ));

    it('can fetch a valid token when querying the Auth API', done => {
        const mockedResponse = new ResponseOptions({
            body: '{"token": "eyJhbGciOi"}'
        });

        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                if (connection.request.url === '/api/authentication') {
                    connection.mockRespond(new Response(mockedResponse));
                }
            }
        );

        authenticationService.httpLogin({
            username: 'foo',
            password: 'bar'
        })
            .then(success => {
                expect(success).toBeTruthy();
                done();
            },
            error => done.fail(error)
            );
    });
});

describe('emits an event upon user auth status changes', () => {
    let authenticationService: AuthenticationService;

    beforeEachProviders(() => [AuthenticationService]);

    beforeEach(inject(
        [AuthenticationService], (_authenticationService) => {
            authenticationService = _authenticationService;
        }
    ));

    it('that should be truthy for successful logins', done => {
        authenticationService
            .userIsLoggedIn
            .subscribe((authStatus: boolean) => {
                expect(authStatus).toBeTruthy();
                done();
            });

        authenticationService.login({
            username: 'john@doemail.com',
            password: 'letmein'
        });
    });

    it('that should be falsy for failed logins', done => {
        authenticationService
            .userIsLoggedIn
            .subscribe((authStatus: boolean) => {
                expect(authStatus).toBeFalsy();
                done();
            });

        authenticationService.login({
            username: 'foo',
            password: 'bar'
        });
    });
});




