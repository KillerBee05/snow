import { Component, OnInit, OnDestroy } from '@angular/core';
import {ClientService} from '../../services/client/client.service';
import {Client} from '../../models/client/client';
import {AuthService} from '../../services/auth/auth.service';
import {Router, NavigationExtras} from '@angular/router';
const swal = require('sweetalert');

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[];
  client: Client;
  firstName: string;
  lastName: string;
  description: string;

  user:Object;

  toggleInfo: any = [];

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    debugger;
    this.authService.authClient().subscribe(client => {
    this.user = client.user;
    },
    err => {
      console.log(err);
    });

    this.clientService.getClient()
      .subscribe(clients =>
      this.clients = clients);
  }

  showInfo(client){
    this.toggleInfo[client._id] = !this.toggleInfo[client._id];
  }

  grabClient(client){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        clientId: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        description: client.description
      }
    };
    this.router.navigate(['/edit-client'], navigationExtras);
  }

  newClient(){
    this.router.navigate(['/add-client']);
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
        this.deleteClient(id);
        swal('Client Deleted!', '', 'success');
      } else {
        return false;
      }

    });
  }

  deleteClient(id:any){
    var clients = this.clients;
    this.clientService.deleteClient(id)
      .subscribe(data =>{
        if(data.n==1){
          for(var i = 0; i < clients.length; i++){
            if(clients[i]._id == id){
              clients.splice(i,1);
            }
          }
        }
      });
  }

}
