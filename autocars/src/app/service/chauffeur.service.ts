import { Injectable } from '@angular/core';
import { chauffeur } from './model/chauffeur';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
  chauffeur:chauffeur

  constructor(private HttpClient: HttpClient) {}

  getallchauffeur(){
    return this.HttpClient.get("http://localhost:8081/chauffeur/getall");
 
  }

  deletechauffeur(id:number){
    return this.HttpClient.delete("http://localhost:8081/chauffeur/delete/"+id);
  }
  addchauffeur(c:chauffeur){
    return this.HttpClient.post("http://localhost:8081/chauffeur/add",c);

  }

  updatechauffeur(c:chauffeur){
    return this.HttpClient.put("http://localhost:8081/update/"+c.idchauffeur,c);

  }

  getchauffeurById(id:number){
    return this.HttpClient.get("http://localhost:8081/chauffeur/rechercheid/"+id);
  }
  

}
