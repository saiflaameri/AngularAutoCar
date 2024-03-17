import { Injectable } from '@angular/core';
import { mission } from './model/mission';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

 
  readonly url="'http://localhost:8081/devcrew'"

  constructor(private HttpClient:HttpClient) { }

  addmission(mi:mission){
    return this.HttpClient.post("http://localhost:8081/mission/add",mi);

  }

  getallmission(){
    return this.HttpClient.get("http://localhost:8081/mission/getall");
  }

  deletemission(id:number){
    return this.HttpClient.delete("http://localhost:8081/mission/delete/"+id);

  }

  updatemission(mi:mission){
    return this.HttpClient.put("http://localhost:8081/mission/update/"+mi.idmission,mi);

  }
  getmissionById(id:number){
    return this.HttpClient.get("http://localhost:8081/mission/rechercheid/"+id);
  }
}
