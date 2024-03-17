import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mission } from 'src/app/service/model/mission';
import { vehicule } from 'src/app/service/model/vehicule';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';
import { MissionService } from 'src/app/service/mission.service';
import { ChauffeurService } from 'src/app/service/chauffeur.service';
import { chauffeur } from 'src/app/service/model/chauffeur';

@Component({
  selector: 'addmission',
  templateUrl: './addmission.component.html',
  styleUrls: ['./addmission.component.sass']
})
export class AddmissionComponent {
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
  listchauffeur: any;
chauffeur:chauffeur
selectedChauffeur:any;
  constructor(private chauffeurService:ChauffeurService,private HttpClient:HttpClient,private vehiculeService:VehiculeService,private missionService:MissionService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

    this.chauffeurService.getallchauffeur().subscribe(data=>{
      
      this.listchauffeur=JSON.parse(JSON.stringify(data));
      console.log('listchauffeur: ',this.listchauffeur);
      console.log("id",this);
      
    
    }) 
   
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


  onSubmit() {
    const missionData = {
      description: this.mission.description,
      pointdepart: this.mission.pointdepart,
      pointarrive: this.mission.pointarrive,
      etatmission: this.mission.etatmission,
      datedebut: this.mission.datedebut,
      datefin: this.mission.datefin,
      chauffeur: this.selectedChauffeur,
      vehicule: this.selectedVehicule
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
      const newMission = new mission(); // Créer une nouvelle instance de Mission
      newMission.description = missionData.description;
      newMission.pointdepart = missionData.pointdepart;
      newMission.pointarrive = missionData.pointarrive;
      newMission.etatmission = missionData.etatmission;
      newMission.datedebut = missionData.datedebut;
      newMission.datefin = missionData.datefin;
      newMission.chauffeur = missionData.chauffeur;
      newMission.vehicule = missionData.vehicule;
  
      this.missionService.addmission(newMission).subscribe(
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