import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../../models/user/user';
import 'rxjs/add/operator/map';


@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  //add User
  addUser(newUser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/user', newUser,{headers:headers})
      .map(res => res.json());
  }


}
