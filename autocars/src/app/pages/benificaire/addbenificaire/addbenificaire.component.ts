import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { benificaire } from 'src/app/service/model/benificaire';
import { vehicule } from 'src/app/service/model/vehicule';
import { BenificaireService } from 'src/app/service/benificaire.service';
import { HttpClient } from '@angular/common/http';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-addbenificaire',
  templateUrl: './addbenificaire.component.html',
  styleUrls: ['./addbenificaire.sass']
})
export class AddbenificaireComponent {
  
  benificaire:benificaire
  progressValue: number;
vehicule:vehicule
vehicules:any;
  public listOfbenificaire : benificaire
  public action:String
  imageDataUrl: any;
  listvehicule: any;
  isModalOpen = false;
  yourModalContent: any

  constructor(private modalService: NgbModal,private HttpClient:HttpClient,private vehiculeService:VehiculeService ,private benificaireService:BenificaireService,private route: Router,private currentRoute:ActivatedRoute){      this.benificaire = new benificaire();
}
ngOnInit():  void { 
  
  let id=this.currentRoute.snapshot.params['id'];
  if(id!=null){
    this.action='Update'
    this.benificaireService.getbenificaireById(id).subscribe(
      (data: benificaire)=>{this.benificaire=data}

    )

    
  }
  else{

  this.action='Add new'

  this.benificaire=new benificaire();
  this.route.navigate[("/benificaire")]
  console.log("eveeentt:",this.benificaire.nom);    
  }

  
  this.benificaireService.getallbenificaire().subscribe(data=>{
      
    this.vehicules=JSON.parse(JSON.stringify(data));
    console.log('listbenificaire: ',this.vehicules);
    console.log("id",this);
    
  
  }) 

  this.vehiculeService.getallvehicule().subscribe(dataa=>{
      
    this.listvehicule=JSON.parse(JSON.stringify(dataa));
    console.log('listvehicule: ',this.listvehicule);
    console.log("id",this);

  
  }) 
  
}
openSuccessModal(content: any) {
  this.modalService.open(content, { centered: true });
  this.isModalOpen = true;
}

//console.log(this.foods.map((x)=>x.viewValue))
//console.log(this.listOfSpecialities.valueOf)

//console.log(this.enum.IA);
//console.log(this.enum);


onSubmit(){
  const benificaireData = {
    cin: this.benificaire.cin,
    nom: this.benificaire.nom,
    prenom: this.benificaire.prenom,
    datenaissance: this.benificaire.datenaissance,
    adresse: this.benificaire.adresse,
    img: this.benificaire.img,
    tel: this.benificaire.tel,
    numeropermis: this.benificaire.numeropermis,
    poste: this.benificaire.poste,


    vehicule: this.vehicule// Utilisez un tableau de véhicules contenant l'objet
  };
  
  if (this.action === "Update") {
    this.benificaireService.updatebenificaire(this.benificaire).subscribe(
      () => {
        this.route.navigate(['/benificaire']);
      },
      () => {
        console.log('error');
      },
      () => {
        console.log('complete');
      }
    );
  } else {
    const newbenificaire = new benificaire(); // Créer une nouvelle instance de benificaire
    newbenificaire.cin = benificaireData.cin;
    newbenificaire.nom = benificaireData.nom;
    newbenificaire.prenom = benificaireData.prenom;
    newbenificaire.datenaissance = benificaireData.datenaissance;
    newbenificaire.adresse = benificaireData.adresse;
    newbenificaire.img = benificaireData.img;
    newbenificaire.tel = benificaireData.tel;
    newbenificaire.numeropermis = benificaireData.numeropermis;
    newbenificaire.poste = benificaireData.poste;



    newbenificaire.vehicule= benificaireData.vehicule;
    this.benificaireService.addbenificaire(newbenificaire).subscribe(
      () => {
        this.route.navigate(['/benificaire']);
      },
      () => {
        console.log('error');
      },
      () => {
        console.log('complete');
      }
    );
  }
  
  this.benificaire = new benificaire();
}
  
onImageSelected(event: any): void {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageDataUrl = e.target.result;
      this.benificaire.img = this.imageDataUrl; // assignez la valeur de imageDataUrl à la propriété img de votre objet benificaire
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
  

}
