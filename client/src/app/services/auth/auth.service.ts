import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../../models/user/user';
import 'rxjs/add/operator/map';
import {Client} from '../../models/client/client';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: Http,
    private jwtHelperService: JwtHelperService
  ) { }

  //Auth User
  authenticateUser(user){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/authenticate', user,{headers:headers})
      .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn(){
    const token: string = this.jwtHelperService.tokenGetter()

      if (!token) {
        return false
      }

      const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token)

      return !tokenExpired
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

// authenticate User Lunch Routes
  authLunch(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/authLunch',{headers:headers})
      .map(res => res.json());
  }

// authenticate User Client Routes
  authClient(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/authClient',{headers:headers})
      .map(res => res.json());
  }

}
