import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { benificaire } from 'src/app/service/model/benificaire';
import { vehicule } from 'src/app/service/model/vehicule';
import { BenificaireService } from 'src/app/service/benificaire.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-benificaire',
  templateUrl: './benificaire.component.html',
  styleUrls: ['./benificaire.component.sass']
})
export class BenificaireComponent implements OnInit {
  listbenificaire:any
  benificaire:benificaire
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  vehicule:vehicule
  public listOfbenificaire : benificaire
  imageDataUrl: any;
  selectedBenificaire: any; // Déclarez cette variable dans votre composant
  logoPath: './src/assets/Logo.png';

  constructor(private HttpClient:HttpClient,private benificaireService:BenificaireService ,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {
    this.benificaireService.getallbenificaire().subscribe(data=>{
      
      this.listbenificaire=JSON.parse(JSON.stringify(data));
      console.log('listbenificaire: ',this.listbenificaire);
      console.log("id",this);
      
    
    }) 
   
    
   
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
    this.router.navigate[("benificaire")]
    console.log("eveeentt:",this.benificaire.nom);    
    }




       
  }
  delete(c: benificaire):void {
  
    let i = this.listbenificaire.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.benificaireService.deletebenificaire(c.idbenificaire).subscribe(() => {
        this.progressValue = 100;
        this.listbenificaire.splice(i, 1);
      });
    }
  }

 
  get filteredList() {
    return this.listbenificaire.filter(benificairer => {
      // Filter by nom, prenom, adresse, or numeropermis
      return benificairer.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
        || benificairer.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
        || benificairer.adresse.toLowerCase().includes(this.searchQuery.toLowerCase())
    });
  }

  onSubmit(){

    if(this.action="Update"){
      this.benificaireService.updatebenificaire(this.benificaire).subscribe(
        ()=>this.router.navigate(['/benificaire']),
        ()=>{console.log('error'),
        ()=>{console.log('complete')}}
  
      )
    }
      
    this.benificaireService.addbenificaire(this.benificaire).subscribe(()=>this.router.navigate(['/benificaire']),()=>{console.log('error'),
    ()=>{console.log('complete')}})
  
  
  
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

  generatePDF() {
    // Définition des polices utilisées dans le PDF
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
   
    // Définition du contenu du document
    const documentDefinition = {
      content: [
        // Logo et en-tête
        {
          columns: [
            // Logo
            // Titre
            { text: 'Tableau des bénéficiaires', fontSize: 18, bold: true, alignment: 'center' }
          ],
          margin: [0, 10, 0, 20] // Marge inférieure pour séparer le logo de l'en-tête du tableau
        },
  
        // Tableau
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              // En-tête du tableau
              ['Photo de profil', 'Date de naissance', 'Adresse', 'Téléphone', 'Numéro de permis', 'Poste'],
  
              // Données du tableau
              ...this.filteredList.map(beneficiaire => [
                // Photo de profil
                { image: beneficiaire.img, width: 50, height: 50 },
                beneficiaire.datenaissance,
                beneficiaire.adresse,
                beneficiaire.tel,
                beneficiaire.numeroperymis,
                beneficiaire.poste
              ])
            ]
          },
          margin: [0, 0, 0, 20] // Marge inférieure pour séparer le tableau du reste du contenu
        }
      ]
    };
  
    // Génération du PDF et téléchargement
    pdfMake.createPdf(documentDefinition).download('tableau_beneficiaires.pdf');
  }
  
}

