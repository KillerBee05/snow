import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/register/register.service';
import {User} from '../../models/user/user';
import {Router} from '@angular/router';
import {ValidationService} from '../../services/validation/validation.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  password: string;


  constructor(
    private registerService: RegisterService,
    private validationService: ValidationService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  addUser(){
    const newUser ={
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      user_name: this.user_name,
      password: this.password
    }

    //Required Fields
    if(!this.validationService.validateRegister(newUser)){
      this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    // Required Email
    if(!this.validationService.validateEmail(this.email)){
      this.flashMessage.show('Please a valid email', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    this.registerService.addUser(newUser)
      .subscribe(user =>{
        if(user.success){
          this.flashMessage.show('You have been Registerd', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/login']);
        }
        else{
          this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
          this.router.navigate(['/register']);
        }
      });


  }

  ngOnInit() {

  }

}
