import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../../models/user/user';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidationService {

  constructor(private http: Http) { }

  validateRegister(user){
    if(user.first_name == undefined || user.last_name == undefined  || user.email == undefined  || user.user_name == undefined  || user.password == undefined ){
      return false;
    }
    else{
      return true;
    }
  }

  validateEmail(email){
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(email);
  }

  validateUser(user){
    if(user.email == undefined  || user.password == undefined ){
      return false;
    }
    else{
      return true;
    }
  }

  }
