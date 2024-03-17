import { Injectable } from '@angular/core';
import { bondecarburation } from './model/bondecarburation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BondecarburationService {
  readonly url="'http://localhost:8081/devcrew'"

  constructor(private HttpClient:HttpClient) { }

  addbondecarburation(bc:bondecarburation){
    return this.HttpClient.post("http://localhost:8081/bondecarburation/add",bc);

  }

  getallbondecarburation(){
    return this.HttpClient.get("http://localhost:8081/bondecarburation/getall");
  }

  deletebondecarburation(id:number){
    return this.HttpClient.delete("http://localhost:8081/bondecarburation/delete/"+id);

  }

  updatebondecarburation(bc:bondecarburation){
    return this.HttpClient.put("http://localhost:8081/bondecarburation/update/"+bc.idbon,bc);

  }
  getbondecarburationById(id:number){
    return this.HttpClient.get("http://localhost:8081/bondecarburation/rechercheid/"+id);
  }
}

