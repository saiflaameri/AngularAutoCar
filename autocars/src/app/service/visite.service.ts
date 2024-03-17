import { Injectable } from '@angular/core';
import { visite } from './model/visite';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VisiteService {
  readonly url="'http://localhost:8081/devcrew'"
  constructor(private HttpClient:HttpClient) { }

  addvisite(vi:visite){
    return this.HttpClient.post("http://localhost:8081/visite/add",vi);

  }

  getallvisite(){
    return this.HttpClient.get("http://localhost:8081/visite/getall");
  }

  deletevisite(id:number){
    return this.HttpClient.delete("http://localhost:8081/visite/delete/"+id);

  }

  updatevisite(vi:visite){
    return this.HttpClient.put("http://localhost:8081/visite/update/"+vi.idvisite,vi);

  }
  getvisiteById(id:number){
    return this.HttpClient.get("http://localhost:8081/visite/rechercheid/"+id);
  }  

}
