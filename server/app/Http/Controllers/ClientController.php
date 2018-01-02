<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function createClient(Request $request){
      $client = new Client();
      $client->firstName = $request->input('firstName');
      $client->lastName = $request->input('lastName');
      $client->description = $request->input('description');

      $client->save();
      return response()->json(['client' => $client], 201);
    }

    public function getClients(){
      $clients = Client::all();
      $response = [
        'clients' => $clients
      ];
      return response()->json($response, 200);
    }

    public function putClient(Request $request, $id){
      $client = Client::find($id);
      if(!$client){
        return response()->json(['message' => 'Client not found'], 404);
      }
      $client->firstName = $request->input('firstName');
      $client->lastName = $request->input('lastName');
      $client->description = $request->input('description');
      $client->save();
      return response()->json(['client' => $client], 200);
    }

    public function deleteClient($id){
      $client = Client::find($id);
      $client->delete();
      return response()->json(['messsage' => 'Client Deleted'], 201);

    }
}
