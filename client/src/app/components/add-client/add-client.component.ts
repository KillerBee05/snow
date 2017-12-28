import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client/client.service';
import {Client} from '../../models/client/client';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
const swal = require('sweetalert');

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client;
  first_name: string;
  last_name: string;
  phone: string;
  valForm: FormGroup;

  togglePersonal: boolean = true;
  toggleContact: boolean =false;
  toggleRace: boolean = false;
  
  constructor(
    private clientService: ClientService,
    private router: Router,
    private _location: Location,
    formBuilder: FormBuilder
  ) {
      this.valForm = formBuilder.group({
        'first_name': [null, Validators.compose([Validators.required, CustomValidators.first_name])],
        'last_name': [null, Validators.compose([Validators.required, CustomValidators.last_name])],
        'phone': [null, Validators.required]
      });
  }

  ngOnInit() {
  }

  showPersonal(){
    this.togglePersonal = true;
    this.toggleContact = false;
    this.toggleRace = false;
  }

  showContact(){
    this.togglePersonal = false;
    this.toggleContact = true;
    this.toggleRace = false;
  }

  showRace(){
    this.togglePersonal = false;
    this.toggleContact = false;
    this.toggleRace = true;
  }

  submitForm($ev, value: any) {
      $ev.preventDefault();
      const user = {
        first_name:value.first_name,
        last_name:value.last_name,
        phone:value.phone,
      }
      for (let c in this.valForm.controls) {
          this.valForm.controls[c].markAsTouched();
      }
      if (this.valForm.valid) {
          this.addClient();
          console.log('Valid!');
          console.log(value);
      }
  }


  goBack(){
    this._location.back();
  }

  addClient(){
    const newClient = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.clientService.addClient(newClient)
      .subscribe(client =>{
        return;
      });
    swal('Client Created!', '', 'success');
    this._location.back();
  }

}
