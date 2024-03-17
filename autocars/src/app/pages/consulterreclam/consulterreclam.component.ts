import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { reclamation } from 'src/app/service/model/reclamation';
import { ReclamationService } from 'src/app/service/reclamation.service';

@Component({
  selector: 'consulterreclam',
  templateUrl: './consulterreclam.component.html',
  styleUrls: ['./consulterreclam.component.sass']
})
export class ConsulterreclamComponent implements OnInit {
  listreclamation: any;
  reclamation:reclamation
  constructor(private HttpClient:HttpClient, private reclamationService:ReclamationService){

  }
  ngOnInit(): void {
    this.reclamationService.getallreclamation().subscribe(data=>{
      
      this.listreclamation=JSON.parse(JSON.stringify(data));
      console.log('listchauffeur: ',this.listreclamation);
      console.log("id",this);
      
    
    }) 
  }

}
