import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {Evenement }from'../service/model/Evenement'

@Injectable({
  providedIn: 'root'
})
export class EventService {

Evenement:Evenement
 readonly url='http://localhost:8082/devcrew'
  constructor(private HttpClient: HttpClient) {}

   
  addevent(e:Evenement){
    return this.HttpClient.post("http://localhost:8082/addevent",e);

  }
  getAllEvent(){
    return this.HttpClient.get("http://localhost:8082/getAllevent");
 
  }
 /* getAllEvent (e:Evenement){
    return this.HttpClient.get("http://localhost:8081/getAllevent");
    console.log("affffffff",this.Evenement)
  }*/

  deleteevent(id:number){
    return this.HttpClient.delete("http://localhost:8082/deleteevent/"+id);
  }



  updateevent(e:Evenement){
    return this.HttpClient.put("http://localhost:8082/update/"+e.idevent,e);

  }

  geteventById(id:number){
    return this.HttpClient.get("http://localhost:8081/rechercheevent/"+id)
  }
  ggeteventById(id:number){
    return this.HttpClient.get("http://localhost:8081/rechercheevent/"+id)
  }
  countevent(){
    return this.HttpClient.get("http://localhost:8081/ecount");
  }

}
