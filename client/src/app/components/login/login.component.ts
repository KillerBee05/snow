import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user/user';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidationService} from '../../services/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_name:string;
  password:string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validationService: ValidationService,
  ) { }

  onLogin(){
    const user = {
      user_name:this.user_name,
      password:this.password
    }

    //Required Fields
    if(!this.validationService.validateUser(user)){
      this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    this.authService.authenticateUser(user)
      .subscribe(user=>{
        if(user.success){
          this.authService.storeUserData(user.token, user.user);
          this.flashMessage.show('Welcome to the Demo', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/client']);
        }
        else{
          this.flashMessage.show('Incorrect User Name or Password', { cssClass: 'alert-danger', timeout: 5000 });
        }

      });
  }

  ngOnInit() {
  }


}
