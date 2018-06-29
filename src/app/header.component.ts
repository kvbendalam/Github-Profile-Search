import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GithubService } from './services/github.service';

import 'rxjs/add/operator/map';

import { GithubUser } from './model/IGithubUser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() githubUser: GithubUser;

  constructor(private _githubService: GithubService) {
  }

  ngOnInit() {
    if (this.githubUser) {
      this.githubUser.user = false;
      this.getUserInformation();
    }
  }

  searchUser() {
    if (this.githubUser.userName && this.githubUser.userName.length > 0) {
      this._githubService.updateUser(this.githubUser.userName);
      this.getUserInformation();
    } else {
      this.githubUser.user = false;
    }
  }

  getUserInformation() {
    if (this.githubUser.userName && this.githubUser.userName.length > 0) {

      this._githubService.getUser().subscribe(user => {
        this.githubUser.user = user;
      },
        (err) => {
          console.log('err:' + err);
          this.githubUser.user = false;
        },
        () => console.log('Done')
      );

      this._githubService.getRepos().subscribe(repos => {
        console.log(repos);
        this.githubUser.repos = repos;
      },
        (err) => {
          console.log('err:' + err);
          this.githubUser.user = false;
        },
        () => console.log('Done')
      );
    }
  }
}
