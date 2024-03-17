import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { vehicule } from 'src/app/service/model/vehicule';
import { vignette } from 'src/app/service/model/vignette';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { VignettService } from 'src/app/service/vignett.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addvignette',
  templateUrl: './addvignette.component.html',
  styleUrls: ['./addvignette.component.sass']
})
export class AddvignetteComponent {
  listvignette:any
  vignette:vignette
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  vehicule:vehicule
  public listOfvignette : vignette
  imageDataUrl: any;
  listvehicule:vehicule[];
  selectedVehicle: any;

  constructor(private HttpClient:HttpClient,private vehiculeService:VehiculeService,private vignetteService:VignettService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

    this.vehiculeService.getallvehicule().subscribe(dataa=>{
      
      this.listvehicule=JSON.parse(JSON.stringify(dataa));
      console.log('listvehicule: ',this.listvehicule);
      console.log("id",this);

    
    }) 
    this.vignetteService.getallvignette().subscribe(data=>{
      
      this.listvignette=JSON.parse(JSON.stringify(data));
      console.log('listvignette: ',this.listvignette);
      console.log("id",this);
      
    
    }) 
   
    
   
    let id=this.currentRoute.snapshot.params['id'];
    if(id!=null){
      this.action='Update'
      this.vignetteService.getvignetteById(id).subscribe(
        (data: vignette)=>{this.vignette=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.vignette=new vignette();
    this.router.navigate[("vignette")]
    }




       
  }
  delete(c: vignette):void {
  
    let i = this.listvignette.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.vignetteService.deletevignette(c.idvignette).subscribe(() => {
        this.progressValue = 100;
        this.listvignette.splice(i, 1);
      });
    }
  }

 
  get filteredList() {
    return this.listvignette.filter(vignetter => {
      // Filter by nom, prenom, adresse, or numeropermis
      return vignetter.puissancemoteur.toLowerCase().includes(this.searchQuery.toLowerCase())
        || vignetter.typecarburant.toLowerCase().includes(this.searchQuery.toLowerCase())
    });
  }
  

  onSubmit(){
    const vignetteData = {
      puissancemoteur: this.vignette.puissancemoteur,
      typecarburant: this.vignette.typecarburant,
      datefin: this.vignette.datefin,
      vehicule: this.vehicule// Utilisez un tableau de véhicules contenant l'objet
    };
    
    if (this.action === "Update") {
      this.vignetteService.updatevignette(this.vignette).subscribe(
        () => {
          this.router.navigate(['/vignette']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    } else {
      const newvignette = new vignette(); // Créer une nouvelle instance de vignette
      newvignette.puissancemoteur = vignetteData.puissancemoteur;
      newvignette.typecarburant = vignetteData.typecarburant;
      newvignette.datefin = vignetteData.datefin;
      newvignette.vehicule= vignetteData.vehicule;
      this.vignetteService.addvignette(newvignette).subscribe(
        () => {
          this.router.navigate(['/vignette']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    }
    
    this.vignette = new vignette();
  }

}