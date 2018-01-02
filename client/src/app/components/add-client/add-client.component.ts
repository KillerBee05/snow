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
  firstName: string;
  lastName: string;
  description: string;
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
        'firstName': [null, Validators.compose([Validators.required, CustomValidators.firstName])],
        'lastName': [null, Validators.compose([Validators.required, CustomValidators.lastName])],
        'description': [null, Validators.required]
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
        firstName:value.firstName,
        lastName:value.lastName,
        description:value.description,
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
      firstName: this.firstName,
      lastName: this.lastName,
      description: this.description
    }
    this.clientService.addClient(newClient)
      .subscribe(client =>{
        return;
      });
    swal('Client Created!', '', 'success');
    this._location.back();
  }

}
