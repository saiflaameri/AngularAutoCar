import { Injectable } from '@angular/core';
import { assurence } from './model/assurence';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssurenceService {
  readonly url="'http://localhost:8081/devcrew'"

  constructor(private HttpClient:HttpClient) { }

  addassurence(asr:assurence){
    return this.HttpClient.post("http://localhost:8081/assurence/add",asr);

  }

  getallassurence(){
    return this.HttpClient.get("http://localhost:8081/assurence/getall");
  }

  deleteassurence(id:number){
    return this.HttpClient.delete("http://localhost:8081/assurence/delete/"+id);

  }

  updateassurence(asr:assurence){
    return this.HttpClient.put("http://localhost:8081/assurence/update/"+asr.idassurence,asr);

  }
  getassurenceById(id:number){
    return this.HttpClient.get("http://localhost:8081/assurence/rechercheid/"+id);
  }
}
