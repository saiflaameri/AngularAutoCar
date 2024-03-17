import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { rapportvoiture } from 'src/app/service/model/rapportvoiture';
import { vehicule } from 'src/app/service/model/vehicule';
import { RapportvoitureService } from 'src/app/service/rapportvoiture.service';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'raaportvoiture',
  templateUrl: './raaportvoiture.component.html',
  styleUrls: ['./raaportvoiture.component.sass']
})
export class RaaportvoitureComponent implements OnInit {
  listrapportvoiture:any
  rapportvoiture:rapportvoiture
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  vehicule:vehicule
  public listOfrapportvoiture : rapportvoiture
  imageDataUrl: any;
  listvehicule: any;

  constructor(private HttpClient:HttpClient,private vehiculeService:VehiculeService,private rapportvoitureService:RapportvoitureService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

    this.vehiculeService.getallvehicule().subscribe(dataa=>{
      
      this.vehicule=JSON.parse(JSON.stringify(dataa));
      console.log('listvehicule: ',this.listvehicule);
      console.log("id",this);

    
    }) 
    this.rapportvoitureService.getallrapportvoiture().subscribe(data=>{
      
      this.listrapportvoiture=JSON.parse(JSON.stringify(data));
      console.log('listrapportvoiture: ',this.listrapportvoiture);
      console.log("id",this);
      
    
    }) 
   
    
   
    let id=this.currentRoute.snapshot.params['id'];
    if(id!=null){
      this.action='Update'
      this.rapportvoitureService.getrapportvoitureById(id).subscribe(
        (data: rapportvoiture)=>{this.rapportvoiture=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.rapportvoiture=new rapportvoiture();
    this.router.navigate[("rapportvoiture")]
    }




       
  }
  delete(c: rapportvoiture):void {
  
    let i = this.listrapportvoiture.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.rapportvoitureService.deleterapportvoiture(c.idrapport).subscribe(() => {
        this.progressValue = 100;
        this.listrapportvoiture.splice(i, 1);
      });
    }
  }



  onSubmit(){

    if(this.action="Update"){
      this.rapportvoitureService.updaterapportvoiture(this.rapportvoiture).subscribe(
        ()=>this.router.navigate(['/rapportvoiture']),
        ()=>{console.log('error'),
        ()=>{console.log('complete')}}
  
      )
    }
      
    this.rapportvoitureService.addrapportvoiture(this.rapportvoiture).subscribe(()=>this.router.navigate(['/rapportvoiture']),()=>{console.log('error'),
    ()=>{console.log('complete')}})
  
  
  
  }

}