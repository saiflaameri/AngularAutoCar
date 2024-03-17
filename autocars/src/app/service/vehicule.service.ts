import { Injectable } from '@angular/core';
import { vehicule } from './model/vehicule';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  vehicule:vehicule

  constructor(private HttpClient: HttpClient) {}

  getallvehicule(){
    return this.HttpClient.get("http://localhost:8081/vehicule/getall");
 
  }

  deletevehicule(id:number){
    return this.HttpClient.delete("http://localhost:8081/vehicule/delete/"+id);
  }
  addvehicule(vh:vehicule){
    return this.HttpClient.post("http://localhost:8081/vehicule/add",vh);

  }

  updatevehicule(vh:vehicule){
    return this.HttpClient.put("http://localhost:8081/update/"+vh.idvehicule,vh);

  }

  getvehiculeById(id:number){
    return this.HttpClient.get("http://localhost:8081/vehicule/rechercheid/"+id);
  }

  countevent(): Observable <number>{
    return this.HttpClient.get<number>("http://localhost:8081/vehicule/count");
  }
}
