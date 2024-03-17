import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { rapportvoiture } from 'src/app/service/model/rapportvoiture';
import { vehicule } from 'src/app/service/model/vehicule';
import { RapportvoitureService } from 'src/app/service/rapportvoiture.service';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'addrapportvoiture',
  templateUrl: './addrapportvoiture.component.html',
  styleUrls: ['./addrapportvoiture.component.sass']
})
export class AddrapportvoitureComponent {

  listrapportvoiture:any
  rapportvoiture:rapportvoiture
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  public listOfrapportvoiture : rapportvoiture
  imageDataUrl: any;
  vehicule:vehicule
  listvehicule:any;
  rapportvoitureData: any;
  isModalOpen = false;
  yourModalContent: any
  constructor(private modalService: NgbModal,private HttpClient:HttpClient,private vehiculeService:VehiculeService,private rapportvoitureService:RapportvoitureService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

    this.vehiculeService.getallvehicule().subscribe(dataa=>{
      
      this.listvehicule=JSON.parse(JSON.stringify(dataa));
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
  openSuccessModal(content: any) {
    this.modalService.open(content, { centered: true });
    this.isModalOpen = true;
  }
  


  onSubmit(){
    const rapportvoitureData = {
      esortie: this.rapportvoiture.esortie,
      earrive: this.rapportvoiture.earrive,
      ksortie: this.rapportvoiture.ksortie,
      karrive: this.rapportvoiture.karrive,
      date: this.rapportvoiture.date,

      vehicule: this.vehicule// Utilisez un tableau de véhicules contenant l'objet
    };
    
    if (this.action === "Update") {
      this.rapportvoitureService.updaterapportvoiture(this.rapportvoiture).subscribe(
        () => {
          this.router.navigate(['/rapportvoiture']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    } else {
      const newrapportvoiture = new rapportvoiture(); // Créer une nouvelle instance de rapportvoiture
      newrapportvoiture.esortie = rapportvoitureData.esortie;
      newrapportvoiture.earrive = rapportvoitureData.earrive;
      newrapportvoiture.ksortie = rapportvoitureData.ksortie;
      newrapportvoiture.karrive = rapportvoitureData.karrive;
      newrapportvoiture.date = rapportvoitureData.date;

      newrapportvoiture.vehicule= rapportvoitureData.vehicule;
      this.rapportvoitureService.addrapportvoiture(newrapportvoiture).subscribe(
        () => {
          this.router.navigate(['/rapportvoiture']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    }
    
    this.rapportvoiture = new rapportvoiture();
    const modalRef = this.openSuccessModal(this.yourModalContent);

  }
  formatTime(time: Date): string {
    if (time instanceof Date) {
      const hours = String(time.getHours()).padStart(2, '0');
      const minutes = String(time.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '';
  }
}
