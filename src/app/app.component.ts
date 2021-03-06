import { PagerService, Pager } from './service/pager/pager.service';
import { Component } from '@angular/core';
import { GithubService } from './service/github/github.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

export interface SortBy {
  value: string;
  order: string;
  viewValue: string;
}

export interface Users {  
  items?: User[];
  total_count?: number;
}

export interface User {  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string;
  users: Users;
  pager: Pager;
  length = 100;
  pageSize = 2;
  pageSizeOptions: number[] = [2, 4, 6, 8];
  allData: Users;

  paginationObj: object = { pageIndex: 1, pageSize: 2 };
  selectedSortByValue: any;

  sortby: SortBy[] = [
    { value: 'login', order: 'asc', viewValue: 'Name (A-Z)' },
    { value: 'login', order: 'des', viewValue: 'Name (Z-A)' },
    { value: 'score', order: 'asc', viewValue: 'Rank (asc)' },
    { value: 'score', order: 'des', viewValue: 'Rank (des)' }
  ];

  constructor(private githubService: GithubService, private pagerService: PagerService) {}

  sortData() {
    this.allData.items = this.orderByProp(this.allData.items, this.selectedSortByValue.value, this.selectedSortByValue.order);
    this.setPagination(this.paginationObj);
  }

  orderByProp(arr, prop, order) {
    return arr.slice().sort(function (a, b) {
      if (order === 'asc') {
        return a[prop] < b[prop] ? -1 : 1;
      } else {
        return a[prop] > b[prop] ? -1 : 1;
      }
    });
  }

  changeSortByValue(event) {
    if (!this.username || this.username === '') {
      this.allData = {};
      this.users = {};
      return;
    }
    this.sortData();
  }

  searchUser() {
    if (!this.username || this.username === '') {
      this.allData = {};
      this.users = {};
      return;
    }

    this.githubService.getUser(this.username).subscribe(users => {
      this.allData = users;
      this.length = users.items.length;
      if (this.selectedSortByValue) {
        this.sortData();
      } else {
        this.setPagination(this.paginationObj);
      }
    });
  }

  setPagination(event) {
    this.pager = this.pagerService.getPager(this.allData.items.length, event.pageIndex, event.pageSize);
    this.users.items = this.allData.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.users.total_count = this.allData.total_count;
  }

  ngOnInit() {
    this.searchUser();
  }
}
