import { chauffeur } from "./chauffeur";
import { vehicule } from "./vehicule";

export class mission{
    idmission: number;
    description: string;
    datedebut: Date;
    datefin: Date;
    pointdepart: string;
    pointarrive: string;
    etatmission: boolean;
    chauffeur: chauffeur;
    vehicule: vehicule;


    public mission(){
        
    }

}
