import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { vehicule } from 'src/app/service/model/vehicule';
import { visite } from 'src/app/service/model/visite';
import { VehiculeService } from 'src/app/service/vehicule.service';
import { VisiteService } from 'src/app/service/visite.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addvisite',
  templateUrl: './addvisite.component.html',
  styleUrls: ['./addvisite.component.sass']
})
export class AddvisiteComponent {
  listvisite:any
 visite:visite
  progressValue: number;
  public action:String;
  searchQuery: string = '';
  vehicules: any;
  vehicule:vehicule
  imageDataUrl: any;
  listvehicule: any;

  constructor(private HttpClient:HttpClient,private vehiculeService:VehiculeService,private visiteService:VisiteService,private router:Router,private currentRoute:ActivatedRoute,){

    
  }
  ngOnInit(): void {
    this.visiteService.getallvisite().subscribe(data=>{
      
      this.listvisite=JSON.parse(JSON.stringify(data));
      console.log('listvisite: ',this.listvisite);
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
      this.visiteService.getvisiteById(id).subscribe(
        (data:visite)=>{this.visite=data}
  
      )
  
      
    }
    else{
  
    this.action='Add new'
  
    this.visite=new visite();
    this.router.navigate[("visite")]
    }




       
  }
  delete(c:visite):void {
  
    let i = this.listvisite.indexOf(c);
  
    if(confirm("Are you sure?")) {
      this.visiteService.deletevisite(c.idvisite).subscribe(() => {
        this.progressValue = 100;
        this.listvisite.splice(i, 1);
      });
    }
  }

 
  get filteredList() {
    return this.listvisite.filter(listvisite => {
      // Filter by nom, prenom, adresse, or numeropermis
      return listvisite.typeaasurence.toLowerCase().includes(this.searchQuery.toLowerCase())
       
    });
  }
  

  onSubmit(){

    if(this.action="Update"){
      this.visiteService.updatevisite(this.visite).subscribe(
        ()=>this.router.navigate(['/visite']),
        ()=>{console.log('update ereure'),
        ()=>{console.log('complete')}}
  
      )
    }
      
    this.visiteService.addvisite(this.visite).subscribe(()=>this.router.navigate(['/visite']),()=>{console.log('error'),
    ()=>{console.log('complete')}})
  
  
  
  }
    

  formatTime(time: Date): string {
    if (time instanceof Date) {
      const hours = String(time.getHours()).padStart(2, '0');
      const minutes = String(time.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '';
  }
  
  parseTime(timeString: string): Date {
    if (timeString) {
      const [hours, minutes] = timeString.split(':');
      const time = new Date();
      time.setHours(Number(hours));
      time.setMinutes(Number(minutes));
      return time;
    }
    return null;
  }
  
}