import { Component, Input } from '@angular/core';
import { GithubService } from '../service/github/github.service';

export interface User {
  avatar_url?: string;
  login?: string;
  html_url?: string;
  organizations_url?: string;
  score: number;
  expanded: boolean;
}

export interface Repositories {
  name?: string;
  language?: string;
  open_issues?: number;
  forks?: number;
  watchers_count?: number;
  stargazers_count?: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @Input() user: User;
  repositories: Repositories;

  constructor(private githubService: GithubService) { }

  getUserRepos(user) {
    if (!user && !user.login) {
      return;
    }
    const username = user && user.login;

    this.githubService.getRepos(username).subscribe(repositories => {
      this.repositories = repositories;
    });
  }
}
