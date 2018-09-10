import { Component, Input } from '@angular/core';
import { GithubService } from '../service/github/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  users: object;

  constructor(private githubService: GithubService) { }

  @Input()
  set usersObj(users: object) {
    this.users = users;
  }

  getUserRepos(user, index) {
    if (!user && !user['login']) {
      return;
    }

    const username = user && user['login'];

    this.githubService.getRepos(username).subscribe(repositories => {
      this.users['items'][index]['repositories'] = repositories;
    });
  }
}
