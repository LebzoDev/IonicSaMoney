import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepotService } from '../service/depot.service';
import { Transaction } from '../service/interfaces.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  formGroup:any = FormGroup;
  emetteur_actif:boolean=true;
  beneficiaire_actif:boolean=false;
  code:string="";

  ExistCode:string="";
  retraitEffectif:boolean;
  messageAlert:string="";
  headerMessageAlert:string="";
  custom:string="custom"

  transactionInitial:any;
  transactionGot:Transaction;
  id:number;
  cniClient:string="";
  nomCompletClient:string="";
  nomCompletBeneficiaire:string="";
  numTelClient:string="";
  numTelBeneficiaire:string="";
  montant:number;



  constructor(
    private router:Router,
    private depotService:DepotService,
    private alertController:AlertController,) { }

  ngOnInit() {
    this.initForm();
  }

  requestCode(code:string){
      this.depotService.getTransactionByCode(code)
          .subscribe(data=>{
            console.log(data[0].retrait);
              if (data[0]) {

                this.transactionGot=data[0];
                this.id = this.transactionGot.id;
                this.montant = this.transactionGot.montant;
                this.nomCompletClient = this.transactionGot.nomCompletClient;
                this.numTelClient = this.transactionGot.numeroTelClient;
                this.cniClient = this.transactionGot.cniClient;
                this.nomCompletBeneficiaire = this.transactionGot.nomCompletBeneficiaire;
                this.numTelBeneficiaire = this.transactionGot.numeroTelBeneficiaire;
                if (this.transactionGot.retraitEffectif) {
                  this.retraitEffectif=true;              
                  console.log('effectif')
                  console.log(this.retraitEffectif)
                }else{
                  this.ExistCode="";
                  console.log('Non effectif')
                  console.log(this.retraitEffectif)
                  this.retraitEffectif = false;
                
                }
              }else{
                this.retraitEffectif=false;
                this.ExistCode="inconnu";
              }
          },
          error=>{
            console.log(error);
          })
  }

  async retraitEffectifAlert() {
    const alert = await this.alertController.create({
      cssClass: this.custom,
      header: this.headerMessageAlert,
      message: this.messageAlert,
      buttons: ['OK']
    });

    await alert.present();
  }

  reset(){
    this.code="";
    this.cniClient="";
    this.nomCompletClient="";
    this.nomCompletBeneficiaire="";
    this.numTelClient="";
    this.numTelBeneficiaire="";
    this.montant=undefined;
  }

  checkRetraitDone(){
    this.requestCode(this.code);
    if (this.retraitEffectif) {
      this.custom ="custom_failed";
      this.messageAlert="Le retrait a été déja fait.";
      this.headerMessageAlert="Effectif";
      this.retraitEffectifAlert();
    }else{
      if (this.ExistCode=="inconnu") {
        this.custom ="custom_failed";
      this.messageAlert="Ce code n'existe pas.";
      this.headerMessageAlert="Attention";
      this.retraitEffectifAlert();
      }else{
        this.custom = "custom_success";
        this.messageAlert="Le retrait n'est pas encore fait.";
        this.headerMessageAlert="Non Effectif";
        this.retraitEffectifAlert();
      }
     
    }

  }

  initForm(){
    this.formGroup =  new FormGroup ({
        code: new FormControl('',[Validators.required]),
        cniClient: new FormControl('',[Validators.required]),
        cniBeneficiaire: new FormControl('',[Validators.required]),
        nomComplet: new FormControl('',[Validators.required]),
        telephone: new FormControl('',[Validators.required]),
        montant: new FormControl('',[Validators.required]),
        nomCompletBeneficiaire: new FormControl('',[Validators.required]),
        telbeneficiaire:new FormControl('',[Validators.required])

    })
  }

  activate_emetteur(){
    this.emetteur_actif=true;
    this.beneficiaire_actif=false;
    // let emet = document.getElementById('emetteur');
    // let benef = document.getElementById('beneficiaire');
    // benef.setAttribute('fill','outline');
    // console.log(benef);
  }

  activate_beneficiaire(){
    this.emetteur_actif=false;
    this.beneficiaire_actif=true;
  }

  EffectuerRetrait(){
    this.requestCode(this.code);
      if (!this.retraitEffectif) {
          if(this.formGroup.valid){
              this.depotService.retraitTransaction(this.formGroup.value,this.id)
                  .subscribe(
                    data=>{
                      this.custom ="custom_success";
                      this.messageAlert="Le retrait est effectué avec succés.";
                      this.headerMessageAlert="SUCCESS";
                      this.retraitEffectifAlert();
                      this.initForm();
                      this.reset();
                  },
                    error=>{
                        console.log(error);
                    })
          }
      }else{
          this.checkRetraitDone();
      }
  }

  moveOnMenu(){
    this.router.navigateByUrl('tabs');
  }

}
