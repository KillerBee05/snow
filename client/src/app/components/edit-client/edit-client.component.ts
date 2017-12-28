import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client/client.service';
import {Client} from '../../models/client/client';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
const swal = require('sweetalert');

@Component({
  selector: 'edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})

export class EditClientComponent implements OnInit {
  clientId: string;
  first_name: string;
  last_name: string;
  phone: string;
  valForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
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
    this.router.queryParams.subscribe(params =>{
      this.clientId = params['clientId'];
      this.first_name = params['first_name'];
      this.last_name = params['last_name'];
      this.phone = params['phone'];
    });
  }

  goBack(){
    this._location.back();
  }

  submitForm($ev, value: any, params) {
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
          this.updateClient(params);
          console.log('Valid!');
          console.log(value);
      }
  }

  updateClient(params){
    const updateClient: Client ={
      _id: this.clientId,
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.clientService.updateClient(updateClient)
    .subscribe(result =>{
      this.clientService.getClient();
    });
      swal('Client Updated!', '', 'success');
      this._location.back();
  }

  confirmDelete(id:any){
    swal({
        title: 'Delete Client?',
        text: 'Confirm!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false
    }, (isConfirm) => {
      if(isConfirm){
        this.deleteClient();
        swal('Client Deleted!', '', 'success');
      } else {
        return false;
      }

    });
  }

  deleteClient(){
    var client = this.clientId;
    this.clientService.deleteClient(client)
      .subscribe(data =>{
        return;
      });
      this._location.back();
  }
}
