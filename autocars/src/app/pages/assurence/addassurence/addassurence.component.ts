import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssurenceService } from 'src/app/service/assurence.service';
import { assurence } from 'src/app/service/model/assurence';
import { vehicule } from 'src/app/service/model/vehicule';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addassurence',
  templateUrl: './addassurence.component.html',
  styleUrls: ['./addassurence.component.sass']
})
export class AddassurenceComponent {
  listassurence:any
  assurence:assurence
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  vehicule:vehicule
  imageDataUrl: any;
  listvehicule: any;
  isModalOpen = false;
  yourModalContent: any
  constructor(private modalService: NgbModal,private HttpClient:HttpClient,private vehiculeService:VehiculeService,private assurenceService: AssurenceService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {
    this.assurenceService.getallassurence().subscribe(data=>{
      
      this.listassurence=JSON.parse(JSON.stringify(data));
      console.log('listassurence: ',this.listassurence);
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
      this.assurenceService.getassurenceById(id).subscribe(
        (data: assurence)=>{this.assurence=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.assurence=new assurence();
    this.router.navigate[("assurence")]
    }




       
  }
  delete(c: assurence):void {
  
    let i = this.listassurence.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.assurenceService.deleteassurence(c.idassurence).subscribe(() => {
        this.progressValue = 100;
        this.listassurence.splice(i, 1);
      });
    }
  }
  openSuccessModal(content: any) {
    this.modalService.open(content, { centered: true });
    this.isModalOpen = true;
  }
 
  get filteredList() {
    return this.listassurence.filter(listassurence => {
      // Filter by nom, prenom, adresse, or numeropermis
      return listassurence.typeaasurence.toLowerCase().includes(this.searchQuery.toLowerCase())
       
    });
  }
  

  onSubmit(){
    const assurenceData = {
      typeaasurence: this.assurence.typeaasurence,
      tarifbase: this.assurence.tarifbase,
      tauxreduction: this.assurence.tauxreduction,
      tyhpevehicule: this.assurence.tyhpevehicule,
      datedebut: this.assurence.datedebut,
      datefin: this.assurence.datefin,


      vehicule: this.vehicule// Utilisez un tableau de véhicules contenant l'objet
    };
    
    if (this.action === "Update") {
      const newassurence = new assurence(); // Créer une nouvelle instance de assurence
     

      newassurence.vehicule= assurenceData.vehicule;

      this.assurenceService.updateassurence(this.assurence).subscribe(
        () => {
          this.router.navigate(['/assurence']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    } else {
      const newassurence = new assurence(); // Créer une nouvelle instance de assurence
      newassurence.typeaasurence = assurenceData.typeaasurence;
      newassurence.tarifbase = assurenceData.tarifbase;
      newassurence.tauxreduction = assurenceData.tauxreduction;
      newassurence.tyhpevehicule = assurenceData.tyhpevehicule;
      newassurence.datedebut = assurenceData.datedebut;
      newassurence.datefin = assurenceData.datefin;

      newassurence.vehicule= assurenceData.vehicule;
      this.assurenceService.addassurence(newassurence).subscribe(
        () => {
          this.router.navigate(['/assurence']);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      );
    }
    
    this.assurence = new assurence();
  }

    

  }
    