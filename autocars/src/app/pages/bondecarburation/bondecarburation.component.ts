import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { bondecarburation } from 'src/app/service/model/bondecarburation';
import { vehicule } from 'src/app/service/model/vehicule';
import { BondecarburationService } from 'src/app/service/bondecarburation.service';
import { HttpClient } from '@angular/common/http';
import { VehiculeService } from 'src/app/service/vehicule.service';
import * as html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';


import { NgForm } from '@angular/forms';
import { ChauffeurService } from 'src/app/service/chauffeur.service';
@Component({
  selector: 'app-bondecarburation',
  templateUrl: './bondecarburation.component.html',
  styleUrls: ['./bondecarburation.component.sass']
})
export class BondecarburationComponent {
  listbondecarburation:any
  bondecarburation:bondecarburation
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: vehicule[];
  vehicule:vehicule
  imageDataUrl: any;
  listvehicule:vehicule[];
  selectedVehiculeId: vehicule[];
  bondecarburationData: any;
  IdCard:string

  bondecarburations: any[] ;

  constructor(private chauffeurService:ChauffeurService,private HttpClient:HttpClient,private bondecarburationService:BondecarburationService,private vehiculeService:VehiculeService ,private router:Router,private currentRoute:ActivatedRoute,){

    



    this.bondecarburationService.getallbondecarburation().subscribe(data=>{
      
      this.listbondecarburation=JSON.parse(JSON.stringify(data));
      console.log('listbondecarburation: ',this.listbondecarburation);
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
      this.bondecarburationService.getbondecarburationById(id).subscribe(
        (data: bondecarburation)=>{this.bondecarburation=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.bondecarburation=new bondecarburation();
    this.router.navigate[("bon")]
    }




       
  }
  delete(c: bondecarburation):void {
  
    let i = this.listbondecarburation.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.bondecarburationService.deletebondecarburation(c.idbon).subscribe(() => {
        this.progressValue = 100;
        this.listbondecarburation.splice(i, 1); 
      });
     
      
    }
  }

 


  onSubmit(){
    const bondecarburationData = {
      refdebonde: this.bondecarburation.refdebonde,
      montant: this.bondecarburation.montant,
      station: this.bondecarburation.station,
      cout: this.bondecarburation.cout,
      vehicule: this.vehicule// Utilisez un tableau de véhicules contenant l'objet
    };
    
    if (this.action === "Update") {
      this.bondecarburationService.updatebondecarburation(this.bondecarburation).subscribe(
        () => {
          this.router.navigate(['/bon']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    } else {
      const newBondecarburation = new bondecarburation(); // Créer une nouvelle instance de bondecarburation
      newBondecarburation.refdebonde = bondecarburationData.refdebonde;
      newBondecarburation.montant = bondecarburationData.montant;
      newBondecarburation.station = bondecarburationData.station;
      newBondecarburation.cout = bondecarburationData.cout;
      newBondecarburation.vehicule= bondecarburationData.vehicule;
      this.bondecarburationService.addbondecarburation(newBondecarburation).subscribe(
        () => {
          this.router.navigate(['/bon']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    }
    
    this.bondecarburation = new bondecarburation();
  }
  get filteredList() {
    return this.listbondecarburation.filter((item: bondecarburation) => {
      // Filter by refdebonde
      return item.refdebonde.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
   printCard(cardId: string) {
    const printContent = document.getElementById(cardId);
    
    if (printContent) {
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
  
      // Custom CSS for printing
      printWindow.document.write('<html><head>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        /* Customize styles for printing */
        @media print {
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          header{
            color:red;
          }
          main{
            position:center;
          }
          /* Add additional print styles here */
        }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
  
      // Header
      printWindow.document.write('<header>');
      printWindow.document.write('<h1>Printed Card</h1>');
      printWindow.document.write('<p>Date: ' + new Date().toLocaleDateString() + '</p>');
      printWindow.document.write('</header>');
  
      // Content
      printWindow.document.write('<main>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</main>');
  
      // Footer
      printWindow.document.write('<footer>');
      printWindow.document.write('</footer>');
  
      printWindow.document.write('</body></html>');
      printWindow.document.close();
  
      printWindow.print();
      printWindow.close();
    }
  }
  
  
 
  
  

}    