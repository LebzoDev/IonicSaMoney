import { Injectable } from '@angular/core';

export interface Transaction{
  id:number,
  montant:number,
  codeTransaction:string,
  frais:number,
  dateTransaction:Date,
  dateRetrait?:Date,
  type?:string,
  nomCompletClient:string,
  nomCompletBeneficiaire:string,
  numeroTelClient:string,
  numeroTelBeneficiaire:string,
  retraitEffectif:boolean,
  cniClient:string,
  cniBeneficiaire:string,
  utilisateurAP:Utilisateur,
  utilisateurAPRetrait:Utilisateur,
  part_user_depot:number,
  part_user_retrait?:number
}
export interface Utilisateur{
  id:number,
  email?:string,
  telephone:string,
  prenom:string,
  nom:string
}

@Injectable({
  providedIn: 'root'
})
export class InterfacesService {

  constructor() { }
}
