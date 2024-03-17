import { Injectable } from '@angular/core';
import { benificaire } from './model/benificaire';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BenificaireService {
  readonly url="'http://localhost:8081/devcrew'"

  constructor(private HttpClient:HttpClient) { }

  addbenificaire(bs:benificaire){
    return this.HttpClient.post("http://localhost:8081/benificaire/add",bs);

  }

  getallbenificaire(){
    return this.HttpClient.get("http://localhost:8081/benificaire/getall");
  }

  deletebenificaire(id:number){
    return this.HttpClient.delete("http://localhost:8081/benificaire/delete/"+id);

  }

  updatebenificaire(bs:benificaire){
    return this.HttpClient.put("http://localhost:8081/benificaire/update/"+bs.idbenificaire,bs);

  }
  getbenificaireById(id:number){
    return this.HttpClient.get("http://localhost:8081/benificaire/rechercheid/"+id);
  }
}

