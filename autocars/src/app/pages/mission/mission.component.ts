import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/service/mission.service';
import { mission } from 'src/app/service/model/mission';
import { vehicule } from 'src/app/service/model/vehicule';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.sass']
})
export class MissionComponent {
  listmission:any
  mission:mission
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  vehicule:vehicule
  public listOfmission : mission
  imageDataUrl: any;
  listvehicule: any;

  constructor(private HttpClient:HttpClient,private vehiculeService:VehiculeService,private missionService:MissionService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

    this.vehiculeService.getallvehicule().subscribe(dataa=>{
      
      this.listvehicule=JSON.parse(JSON.stringify(dataa));
      console.log('listvehicule: ',this.listvehicule);
      console.log("id",this);

    
    }) 
    this.missionService.getallmission().subscribe(data=>{
      
      this.listmission=JSON.parse(JSON.stringify(data));
      console.log('listmission: ',this.listmission);
      console.log("id",this);
      
    
    }) 
   
    
   
    let id=this.currentRoute.snapshot.params['id'];
    if(id!=null){
      this.action='Update'
      this.missionService.getmissionById(id).subscribe(
        (data: mission)=>{this.mission=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.mission=new mission();
    this.router.navigate[("mission")]
    }




       
  }
  delete(c: mission):void {
  
    let i = this.listmission.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.missionService.deletemission(c.idmission).subscribe(() => {
        this.progressValue = 100;
        this.listmission.splice(i, 1);
      });
    }
  }



 
}