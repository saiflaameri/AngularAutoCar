import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { reclamation } from 'src/app/service/model/reclamation';
import { vehicule } from 'src/app/service/model/vehicule';
import { ReclamationService } from 'src/app/service/reclamation.service';
import { HttpClient } from '@angular/common/http';
import * as annyang from 'annyang';

@Component({
  selector: 'reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.sass']
})
export class ReclamationComponent {

  listreclamation:any
  reclamation:reclamation
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  vehicule:vehicule
  imageDataUrl: any;
  listvehicule: any;
  transcript: string = '';

  constructor(private HttpClient:HttpClient,private reclamationService: ReclamationService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {

    if (annyang) {
      const commands = {
        '*term': (term: string) => {
          this.transcript = term;
         

          
          // Effectuez des actions supplémentaires ici en fonction du terme recherché
        }
      };
    
    

  annyang.addCommands(commands);
  annyang.start();
}

    this.reclamationService.getallreclamation().subscribe(data=>{
      
      this.listreclamation=JSON.parse(JSON.stringify(data));
      console.log('listreclamation: ',this.listreclamation);
      console.log("id",this);
      
    
    }) 
   
   
   
    
   
    let id=this.currentRoute.snapshot.params['id'];
    if(id!=null){
      this.action='Update'
      this.reclamationService.getreclamationById(id).subscribe(
        (data: reclamation)=>{this.reclamation=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.reclamation=new reclamation();
    this.router.navigate[("reclamation")]
    }




       
  }
  delete(c: reclamation):void {
  
    let i = this.listreclamation.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.reclamationService.deletereclamation(c.idreclamation).subscribe(() => {
        this.progressValue = 100;
        this.listreclamation.splice(i, 1);
      });
    }
  }

 
  get filteredList() {
    return this.listreclamation.filter(listreclamation => {
      // Filter by nom, prenom, adresse, or numeropermis
      return listreclamation.typeaasurence.toLowerCase().includes(this.searchQuery.toLowerCase())
       
    });
  }
  

  onSubmit(){

    if(this.action="Update"){
      this.reclamationService.updatereclamation(this.reclamation).subscribe(
        ()=>this.router.navigate(['/reclamation']),
        ()=>{console.log('error'),
        ()=>{console.log('complete')}}
  
      )
    }
      
    this.reclamationService.addreclamation(this.reclamation).subscribe(()=>this.router.navigate(['/reclamation']),()=>{console.log('error'),
    ()=>{console.log('complete')}})
  
  
  
  }
    
  startListening(): void {
    if (annyang) {
      annyang.start();
    }
  }
  
  stopListening(): void {
    if (annyang) {
      annyang.abort();
    }
  }
  }