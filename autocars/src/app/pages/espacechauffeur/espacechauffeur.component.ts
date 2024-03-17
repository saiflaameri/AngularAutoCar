import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/service/mission.service';
import { mission } from 'src/app/service/model/mission';
import { vehicule } from 'src/app/service/model/vehicule';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'espacechauffeur',
  templateUrl: './espacechauffeur.component.html',
  styleUrls: ['./espacechauffeur.component.sass']
})
export class EspacechauffeurComponent {

  listmission:any
  mission:mission
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: vehicule;
  vehicule:vehicule
  public listOfmission : mission
  imageDataUrl: any;
  listvehicule: vehicule[];
  selectedVehicule: any; // Remplacez le type "any" par votre modèle de véhicule approprié

  constructor(private HttpClient:HttpClient,private vehiculeService:VehiculeService,private missionService:MissionService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  currentuser : any ;
  nom : any ;
  prenom :any;
  img:any;
  ngOnInit(): void {

  
  
   
  const user = localStorage.getItem('user');
  this.currentuser = JSON.parse(user);
  this.nom = this.currentuser.nom;
  this.prenom=this.currentuser.prenom;
  this.img=this.currentuser.img;


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
  delete(c: mission): void {
    const i = this.listmission.indexOf(c);

    if (confirm('Êtes-vous sûr(e) ?')) {
      this.missionService.deletemission(c.idmission).subscribe(() => {
        this.listmission.splice(i, 1);
      });
    }
  }


 
  onSubmit(){
    const missionData = {
      description: this.mission.description,
      pointdepart: this.mission.pointdepart,
      pointarrive: this.mission.pointarrive,
      datedebut: this.mission.datedebut,
      datefin: this.mission.datefin,
      etatmission: this.mission.etatmission,


      vehicule: this.vehicule// Utilisez un tableau de véhicules contenant l'objet
    };
    
    if (this.action === "Update") {
      this.missionService.updatemission(this.mission).subscribe(
        () => {
          this.router.navigate(['/mission']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    } else {
      const newmission = new mission(); // Créer une nouvelle instance de mission
      newmission.description = missionData.description;
      newmission.pointdepart = missionData.pointdepart;
      newmission.pointarrive = missionData.pointarrive;
      newmission.datedebut = missionData.datedebut;
      newmission.vehicule= missionData.vehicule;
      this.missionService.addmission(newmission).subscribe(
        () => {
          this.router.navigate(['/mission']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    }
    
    this.mission = new mission();
  }
  get filteredList() {
    return this.listmission.filter((item: mission) => {
      // Filter by description
      return item.description.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }}