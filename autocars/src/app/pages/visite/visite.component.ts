import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { vehicule } from 'src/app/service/model/vehicule';
import { visite } from 'src/app/service/model/visite';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';
import { VisiteService } from 'src/app/service/visite.service';

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.sass']
})
export class VisiteComponent implements OnInit {
  listvisite:any
  visite:visite
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  vehicule:vehicule
  imageDataUrl: any;
  listvehicule: any;
visites:any;
  constructor(private HttpClient:HttpClient,private vehiculeService:VehiculeService,private visiteService: VisiteService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

    this.generateQRCodeValue
    this.visiteService.getallvisite().subscribe(data=>{
      
      this.listvisite=JSON.parse(JSON.stringify(data));
      console.log('listvisite: ',this.listvisite);
      console.log("id",this);
      
    
    }) 
   
    this.vehiculeService.getallvehicule().subscribe(dataa=>{
      
      this.listvehicule=JSON.parse(JSON.stringify(dataa));
      console.log('listvehicule: ',this.listvehicule);
      console.log("id",this);

    
    }) 
   
    
   
    let id=this.currentRoute.snapshot.params['id'];
    if(id!=null){
      this.action='Update'
      this.visiteService.getvisiteById(id).subscribe(
        (data: visite)=>{this.visite=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.visite=new visite();
    this.router.navigate[("visite")]
    }




       
  }
  delete(c: visite):void {
  
    let i = this.listvisite.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.visiteService.deletevisite(c.idvisite).subscribe(() => {
        this.progressValue = 100;
        this.listvisite.splice(i, 1);
      });
    }
  }

 
  
  

  onSubmit(){

    if(this.action="Update"){
      this.visiteService.updatevisite(this.visite).subscribe(
        ()=>this.router.navigate(['/visite']),
        ()=>{console.log('error'),
        ()=>{console.log('complete')}}
  
      )
    }
      
    this.visiteService.addvisite(this.visite).subscribe(()=>this.router.navigate(['/visite']),()=>{console.log('error'),
    ()=>{console.log('complete')}})
  
  
  
  }
  generateQRCodeValue(listvisite: any): string {
    const date = new Date(listvisite.datevisite);
    const heure = new Date(listvisite.heurevisite);
    const kilometrageactuelle = String(listvisite.kilometrageactuelle);
    const qrCodeValue = `Date: ${date}, Heure: ${heure}, Kilometrage: ${kilometrageactuelle}`;
    return qrCodeValue;
  }
}  
  
    

    