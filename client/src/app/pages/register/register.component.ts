import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import {RegisterService} from '../../services/register/register.service';
import {User} from '../../models/user/user';
import {Router} from '@angular/router';
// import {ValidationService} from '../../services/validation/validation.service';

const swal = require('sweetalert');

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    user: User;
    first_name: string;
    last_name: string;
    email: string;
    user_name: string;
    password: string;
    account_agreed: boolean;

    valForm: FormGroup;
    passwordForm: FormGroup;

    constructor(
      public settings: SettingsService,
      private router: Router,
      private registerService: RegisterService,
      formBuilder: FormBuilder
    ) {

        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        let certainPassword = new FormControl('', CustomValidators.equalTo(password));

        this.passwordForm = formBuilder.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        this.valForm = formBuilder.group({
            'first_name': [null, Validators.required],
            'last_name': [null, Validators.required],
            'user_name': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'account_agreed': [null],
            'passwordGroup': this.passwordForm
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        const user ={
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          user_name: this.user_name,
          password: this.password,
          account_agreed: this.account_agreed
        }

        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        for (let c in this.passwordForm.controls) {
            this.passwordForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            this.addUser(user);
            console.log('Valid!');
            console.log(value);
        }
    }

    addUser(user){
      this.registerService.addUser(user).subscribe(user =>{
        if(user.success){
          swal(user.msg);
          this.router.navigate(['/login']);
        }
        else{
          swal(user.msg);
          this.router.navigate(['/register']);
        }
      });
    }

    ngOnInit() {

    }

}
