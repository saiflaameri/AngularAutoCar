import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { vehicule } from 'src/app/service/model/vehicule';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { VignettService } from 'src/app/service/vignett.service';
import { HttpClient } from '@angular/common/http';
import { AssurenceService } from 'src/app/service/assurence.service';
import { VisiteService } from 'src/app/service/visite.service';
import { vignette } from 'src/app/service/model/vignette';
import { JsonFilterPipe } from 'src/app/json-filter.pipe';
import { assurence } from 'src/app/service/model/assurence';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.sass']
})
export class VehiculeComponent {
  listvehicule:any
  vehicule:vehicule
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  public listOfvehicule : vehicule
  imageDataUrl: any;
  listvignette:any
  listassurence:any
  listvisite:any
selectedvignette:any;
selectedassurence:any;
vignette:vignette
assurence:assurence
  constructor(private assurenceService:AssurenceService,private vignetteService:VignettService,private visiteService:VisiteService,private HttpClient:HttpClient,private vehiculeService:VehiculeService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

    this.assurenceService.getallassurence().subscribe(data=>{
      this.listassurence=JSON.parse(JSON.stringify(data));
    })

    /********************************************************* */
    this.visiteService.getallvisite().subscribe(data=>{
      this.listvisite=JSON.parse(JSON.stringify(data));
    })
//************************************************************** */
  this.vignetteService.getallvignette().subscribe(data=>{
    this.listvignette=JSON.parse(JSON.stringify(data));
  })

  //*************************************************************** */
    this.vehiculeService.getallvehicule().subscribe(data=>{
      
      this.listvehicule=JSON.parse(JSON.stringify(data));
      console.log('listvehicule: ',this.listvehicule);
      console.log("id",this);
      
    
    }) 
   
    
   
    let id=this.currentRoute.snapshot.params['id'];
    if(id!=null){
      this.action='Update'
      this.vehiculeService.getvehiculeById(id).subscribe(
        (data: vehicule)=>{this.vehicule=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.vehicule=new vehicule();
    this.router.navigate[("vehicule")]
    }




       
  }
  delete(c: vehicule):void {
  
    let i = this.listvehicule.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.vehiculeService.deletevehicule(c.idvehicule).subscribe(() => {
        this.progressValue = 100;
        this.listvehicule.splice(i, 1);
      });
    }
  }

 
  get filteredList() {
    return this.listvehicule.filter(vehiculer => {
      // Filter by nom, prenom, adresse, or numeropermis
      return vehiculer.puissancemoteur.toLowerCase().includes(this.searchQuery.toLowerCase())
        || vehiculer.typecarburant.toLowerCase().includes(this.searchQuery.toLowerCase())
    });
  }
  

  onSubmit(){

    if(this.action="Update"){
      this.vehiculeService.updatevehicule(this.vehicule).subscribe(
        ()=>this.router.navigate(['/vehicule']),
        ()=>{console.log('error'),
        ()=>{console.log('complete')}}
  
      )
    }
      
    this.vehiculeService.addvehicule(this.vehicule).subscribe(()=>this.router.navigate(['/vehicule']),()=>{console.log('error'),
    ()=>{console.log('complete')}})
  
  
  
  }

}
