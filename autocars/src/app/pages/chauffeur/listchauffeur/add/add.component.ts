import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChauffeurService } from 'src/app/service/chauffeur.service';
import { chauffeur } from 'src/app/service/model/chauffeur';
import { vehicule } from 'src/app/service/model/vehicule';
import { HttpClient } from '@angular/common/http';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/pages/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent {
  
  chauffeur:chauffeur
  progressValue: number;
vehicule:vehicule
vehicules:any;
  public listOfchauffeur : chauffeur
  public action:String
  imageDataUrl: any;
  listvehicule: any;
  isModalOpen = false;
  yourModalContent: any
  dupli:any;
  constructor(private modalService: NgbModal,private HttpClient:HttpClient,private vehiculeService:VehiculeService ,private chauffeurService:ChauffeurService,private route: Router,private currentRoute:ActivatedRoute){      this.chauffeur = new chauffeur();
}
ngOnInit():  void { 
  
  let id=this.currentRoute.snapshot.params['id'];
  if(id!=null){
    this.action='Update'
    this.chauffeurService.getchauffeurById(id).subscribe(
      (data: chauffeur)=>{this.chauffeur=data}

    )

    
  }
  else{

  this.action='Add new'

  this.chauffeur=new chauffeur();
  this.route.navigate[("/chauffeur")]
  console.log("eveeentt:",this.chauffeur.nom);    
  }

  
  this.chauffeurService.getallchauffeur().subscribe(data=>{
      
    this.vehicules=JSON.parse(JSON.stringify(data));
    console.log('listchauffeur: ',this.vehicules);
    console.log("id",this);
    
  
  }) 

  this.vehiculeService.getallvehicule().subscribe(dataa=>{
      
    this.listvehicule=JSON.parse(JSON.stringify(dataa));
    console.log('listvehicule: ',this.listvehicule);
    console.log("id",this);

  
  }) 
 
  
}

//console.log(this.foods.map((x)=>x.viewValue))
//console.log(this.listOfSpecialities.valueOf)

//console.log(this.enum.IA);
//console.log(this.enum);

openSuccessModal(content: any) {
  this.modalService.open(content, { centered: true });
  this.isModalOpen = true;
}

onSubmit() {
  if (this.action === "Update") {
    this.chauffeurService.updatechauffeur(this.chauffeur).subscribe(
      () => {
        this.route.navigate(['/chauffeur']);
      },
      (error) => {
        console.log('Erreur lors de la mise à jour du chauffeur :', error);
      },
      () => {
        console.log('Mise à jour du chauffeur terminée.');
      }
    );
  } else {
    this.chauffeurService.getallchauffeur().subscribe(
      (chauffeurs: chauffeur[]) => {
        const isDuplicate = chauffeurs.some(
          (existingChauffeur: chauffeur) =>
            existingChauffeur.email === this.chauffeur.email || existingChauffeur.cin === this.chauffeur.cin
        );

        if (isDuplicate) {
          this.dupli=" Un chauffeur avec la même adresse e-mail ou CIN existe déjà.";
        } else {
          this.chauffeurService.addchauffeur(this.chauffeur).subscribe(
            () => {

              this.route.navigate(['/chauffeur']);
            },
            (error) => {
              console.log('Erreur lors de l\'ajout du chauffeur :', error);
            },
            () => {
              console.log('Ajout du chauffeur terminé.');
            }
          );
        }
      },
      (error) => {
        console.log('Erreur lors de la récupération des chauffeurs :', error);
      }
    );
  }
}

onImageSelected(event: any): void {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageDataUrl = e.target.result;
      this.chauffeur.img = this.imageDataUrl; // assignez la valeur de imageDataUrl à la propriété img de votre objet chauffeur
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}


}
