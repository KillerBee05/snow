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
    username:string;
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
          client_id: 2,
          client_secret:'RxsYvHlF6OfI2a37AfOuXOCkrBo3y8NuIET6A9fZ',
          grant_type:'password',
          username:value.email,
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
      debugger;
      this.authService.authenticateUser(user)
        .subscribe(user=>{
          if(user.success){
            this.authService.storeUserData(user.token, user.user);
            swal({
              title:'Yay',
              text:"Welcome to Ice Demo!",
              type:'success'
            });
            this.router.navigate(['/client']);
          }
          else{
            swal({
              title: 'Something Went Wrong :(',
              text: "Wrong user name or password, please try again",
              type: 'error'
            });
          }

        });
    }

    ngOnInit() {

    }

}
