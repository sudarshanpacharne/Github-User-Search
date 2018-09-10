import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private username: string;
  private apiurl: string;

  constructor(private _http: HttpClient) {
    this.apiurl = 'https://api.github.com';
  }

  getUser() {
    return this._http.get(this.apiurl + '/search/users?q=' + this.username);
  }

  getRepos(username: string) {
    return this._http.get(this.apiurl + '/users/' + username + '/repos');
  }

  updateUser(username: string) {
    this.username = username;
  }
}
