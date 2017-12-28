import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'lunch',
  styleUrls: ['./lunch.component.css'],
  templateUrl: './lunch.component.html',
})
export class LunchComponent implements OnInit {

  user:Object;

  constructor(  private authService: AuthService ) {  }
  tiles = [
      {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
  ngOnInit() {

    this.authService.authLunch().subscribe(lunch => {
    this.user = lunch.user;
    },
    err => {
      console.log(err);
    });
  }


}
