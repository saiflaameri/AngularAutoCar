import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vignette } from './model/vignette';

@Injectable({
  providedIn: 'root'
})
export class VignettService {
readonly url="'http://localhost:8081/devcrew'"
  constructor(private HttpClient:HttpClient) { }

  addvignette(vg:vignette){
    return this.HttpClient.post("http://localhost:8081/vignette/add",vg);

  }

  getallvignette(){
    return this.HttpClient.get("http://localhost:8081/vignette/getall");
  }

  deletevignette(id:number){
    return this.HttpClient.delete("http://localhost:8081/vignette/delete/"+id);

  }

  updatevignette(vg:vignette){
    return this.HttpClient.put("http://localhost:8081/vignette/update/"+vg.idvignette,vg);

  }
  getvignetteById(id:number){
    return this.HttpClient.get("http://localhost:8081/vignette/rechercheid/"+id);
  }
  

}
