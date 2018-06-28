import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GithubService {
    private userName: string;
    private clientId = '60b9f23dedffbdfc476c';
    private clientSecret = 'd1c186c6373f96571c0bfcf76b84e4dc6fd0c15a';

    constructor(private _http: Http) {
        console.log('Github sservice is ready');
        this.userName = '';
    }

    getUser() {
        if (this.userName) {
            return this._http.get('https://api.github.com/users/' + this.userName
            + '?client_id=' + this.clientId
            + '&client_secret=' + this.clientSecret)
            .map(res => res.json())
            .catch(this.handleError);
        }
    }

    getRepos() {
        if (this.userName) {
            return this._http.get('https://api.github.com/users/' + this.userName
                + '/repos?client_id=' + this.clientId
                + '&client_secret=' + this.clientSecret)
                .map(res => res.json())
                .catch(this.handleError);
        }

    }

    updateUser(userName: string) {
        this.userName = userName;
    }


    private handleError(error: any) {
        if (error.status === 401) {
            return Observable.throw(error.status);
        } else {
            return Observable.throw(error.status || 'Server error');
        }
    }
}
