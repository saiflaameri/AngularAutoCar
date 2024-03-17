import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { vehicule } from 'src/app/service/model/vehicule';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addvehicule',
  templateUrl: './addvehicule.component.html',
  styleUrls: ['./addvehicule.component.sass']
})
export class AddvehiculeComponent  implements OnInit{
  listvehicule:any
  vehicule:vehicule
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  public listOfvehicule : vehicule
  imageDataUrl: any;
  isModalOpen = false;
  yourModalContent: any
  constructor(private modalService: NgbModal,private HttpClient:HttpClient,private vehiculeService:VehiculeService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

 
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

  onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageDataUrl = e.target.result;
        this.vehicule.photov = this.imageDataUrl; // assignez la valeur de imageDataUrl à la propriété img de votre objet benificaire
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  openSuccessModal(content: any) {
    this.modalService.open(content, { centered: true });
    this.isModalOpen = true;
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
