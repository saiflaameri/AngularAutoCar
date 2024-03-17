import { assurence } from "./assurence";
import { benificaire } from "./benificaire";
import { bondecarburation } from "./bondecarburation";
import { rapportvoiture } from "./rapportvoiture";
import { vignette } from "./vignette";
import { visite } from "./visite";

export class vehicule {
    idvehicule: number;
    marque: string;
    modele: string;
    annefabrication: Date;
    numeroserie: string;
    couleur: string;
    transmission: string;
    photov: string;
    disponible: boolean;
    assurence: assurence;
    visite: visite;
    vignette: vignette;
    benificaire: benificaire;
    rapportvoiture: rapportvoiture;
    
    
    vehicule(){}


}