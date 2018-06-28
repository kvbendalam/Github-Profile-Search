import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// import * as languageColorMap from './languages.json';

import { GithubUser } from './model/IGithubUser';

@Component({
    selector: 'app-searchresult',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    @Input() githubUser: GithubUser;
    private languageColorMap: any = {};
    constructor(private _http: Http) {

    }
    ngOnInit() {
        this.getLanguagesColors().subscribe(languageColorMap => {
            this.languageColorMap = languageColorMap;
            console.log('languageColorMap :: ', languageColorMap);
          },
            (err) => {
              console.error('err:' + err);
              this.languageColorMap = {};
            },
            () => console.log('Got Language Color Map')
          );

    }

    getLanguagesColors() {
        return this._http.get('./assets/languages.json')
        .map(res => res.json())
        .catch((error: any) => {
            if (error.status === 401) {
                return Observable.throw(error.status);
            } else {
                return Observable.throw(error.status || 'Server error');
            }
        });
    }
    getLanguageColor(languageColor) {
        const languageColorObj = this.languageColorMap[languageColor];
        const color = (languageColorObj && languageColorObj.color) || '#EFEFEF';
        // return '{\'background-color\': \'' + color + '\'}';
        return color;
    }
}
