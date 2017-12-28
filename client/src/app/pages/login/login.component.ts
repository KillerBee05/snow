import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user/user';
import {Router} from '@angular/router';

const swal = require('sweetalert');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user_name:string;
    email:string;
    password:string;
    valForm: FormGroup;

    constructor(
      public settings: SettingsService,
      private authService: AuthService,
      private router: Router,
      formBuilder: FormBuilder
    ) {

        this.valForm = formBuilder.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        const user = {
          email:value.email,
          password:value.password
        }
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            this.onLogin(user);
            console.log('Valid!');
            console.log(value);
        }
    }

    onLogin(user){
      this.authService.authenticateUser(user)
        .subscribe(user=>{
          if(user.success){
            this.authService.storeUserData(user.token, user.user);
            swal({
              title:user.msg,
              text:"Welcome to Ice Demo!",
              type:'success'
            });
            this.router.navigate(['/client']);
          }
          else{
            swal({
              title: user.msg,
              text: "Ah AH AH, Sorry you didn't say the magic word",
              type: 'error'
            });
          }

        });
    }

    ngOnInit() {

    }

}
