import { vehicule } from "./vehicule";

export class chauffeur {
    some(arg0: (existingChauffeur: any) => boolean) {
      throw new Error('Method not implemented.');
    }


    idchauffeur:number;
    cin:number;
    nom:string;
    email : String;
    password : String;
    prenom:string;
    datenaissance:Date;
    adresse:string;
    img:string;
    tel:number;
    numeropermis:number;
    typepermis:string;
    disponible:boolean;
    vehicule: vehicule[];




    
    public chauffeur (){
        
    }

}
