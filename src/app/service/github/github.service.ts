import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repositories } from 'src/app/profile/profile.component';
import { Users } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiurl: string;

  constructor(private _http: HttpClient) {
    this.apiurl = 'https://api.github.com';
  }

  getUser(username: string) {
    return this._http.get<Users>(this.apiurl + '/search/users?q=' + username);
  }

  getRepos(username: string) {
    return this._http.get<Repositories>(this.apiurl + '/users/' + username + '/repos');
  }

  // updateUser(username: string) {
  //   this.username = username;
  // }
}
