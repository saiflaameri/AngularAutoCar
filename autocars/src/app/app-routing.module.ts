import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddassurenceComponent } from './pages/assurence/addassurence/addassurence.component';
import { AssurenceComponent } from './pages/assurence/assurence.component';
import { AddbenificaireComponent } from './pages/benificaire/addbenificaire/addbenificaire.component';
import { BenificaireComponent } from './pages/benificaire/benificaire.component';
import { BondecarburationComponent } from './pages/bondecarburation/bondecarburation.component';
import { AddComponent } from './pages/chauffeur/listchauffeur/add/add.component';
import { ListchauffeurComponent } from './pages/chauffeur/listchauffeur/listchauffeur.component';
import { ConfirmationModalComponent } from './pages/confirmation-modal/confirmation-modal.component';
import { ConsulterreclamComponent } from './pages/consulterreclam/consulterreclam.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EspacechauffeurComponent } from './pages/espacechauffeur/espacechauffeur.component';
import { LoginComponent } from './pages/login/login.component';
import { MapsComponent } from './pages/maps/maps.component';
import { AddmissionComponent } from './pages/mission/addmission/addmission.component';
import { MissionComponent } from './pages/mission/mission.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AddrapportvoitureComponent } from './pages/raaportvoiture/addrapportvoiture/addrapportvoiture.component';
import { RaaportvoitureComponent } from './pages/raaportvoiture/raaportvoiture.component';
import { ReclamationComponent } from './pages/reclamation/reclamation.component';
import { AddvehiculeComponent } from './pages/vehicule/addvehicule/addvehicule.component';
import { VehiculeComponent } from './pages/vehicule/vehicule.component';
import { AddvignetteComponent } from './pages/vignette/addvignette/addvignette.component';
import { VignetteComponent } from './pages/vignette/vignette.component';
import { AddvisiteComponent } from './pages/visite/addvisite/addvisite.component';
import { VisiteComponent } from './pages/visite/visite.component';
import { AuthGuard } from './service/auth.guard';
import { rapportvoiture } from './service/model/rapportvoiture';

const routes: Routes = [
{path:'',component:LoginComponent},
{path:'login',component:LoginComponent},
{ path: 'dashboard', component: DashboardComponent},
{path:'chauffeur',component:ListchauffeurComponent },
  { path:'Formulaire',component:AddComponent},
  { path:'updatechauffeur/:id',component:AddComponent},
  { path:'addchauf',component:AddComponent},

  {path:'benificaire',component:BenificaireComponent},
  {path:'addbenificaire',component:AddbenificaireComponent},
  { path:'updatebenificaire/:id',component:AddbenificaireComponent},
  
  {path:'bon',component:BondecarburationComponent},
  { path:'updatebonde/:id',component:BondecarburationComponent},

  {path:'assurence',component:AssurenceComponent},
  {path:'addassurence',component:AddassurenceComponent},
  {path:'updateassurence/:id',component:AddassurenceComponent},

  {path:'visite',component:VisiteComponent},
  {path:'addlistevisite',component:AddvisiteComponent},
  {path:'updatelistevisite/:id',component:AddvisiteComponent},

  {path:'vignette',component:VignetteComponent},
  {path:'addvignette',component:AddvignetteComponent},
  {path:'updatevignette/:id',component:AddvignetteComponent},

  {path:'vehicule',component:VehiculeComponent},
  {path:'addvehicule',component:AddvehiculeComponent},
  {path:'updatevehicule/:id',component:AddvehiculeComponent},

  {path:'rapportvoiture',component:RaaportvoitureComponent},
  {path:'addrapportvoiture',component:AddrapportvoitureComponent},
  {path:'updaterapportvoiture/:id',component:AddrapportvoitureComponent},

  {path:'mission',component:MissionComponent},
  {path:'addmission',component:AddmissionComponent},
  {path:'updatemission/:id',component:AddmissionComponent},

  {path:'ec',component:EspacechauffeurComponent},
  {path:'reclamation',component:ReclamationComponent},

  {path:'trajet',component:MapsComponent},


  { path: 'crec', component: ConsulterreclamComponent },
  {path:'rr',component: ConfirmationModalComponent},
  { path:'**',component:NotfoundComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
