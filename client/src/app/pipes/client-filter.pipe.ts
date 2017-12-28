import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform {

  transform(clients: any, term: any): any {
    //check if search term is undfined
    if(term === undefined) return clients;
    // return updated clients array
    return clients.filter(function(client){
      return client.first_name.toLowerCase().includes(term.toLowerCase()) || client.last_name.toLowerCase().includes(term.toLowerCase());
    })
  }

}
