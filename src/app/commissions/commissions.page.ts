import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs/operators';
import { DepotService } from '../service/depot.service';
import { Transaction, Utilisateur } from '../service/interfaces.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface PeriodicElement {
  date: string;
  type: string;
  montant: string;
}


@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.page.html',
  styleUrls: ['./commissions.page.scss'],
})
export class CommissionsPage implements OnInit {

  usersAgence:Utilisateur[]=[];
  all:boolean=true;
  idCurrentUser:number;
  formgroup: any = FormGroup;
  dateDebut:Date;
  dateFin:Date;
  constructor(
    private depotService:DepotService,
    private formbuild:FormBuilder,
  ) { }


  transactions:Transaction[]=[];
  transactionsNoDetailed:Transaction[]=[];

  ngOnInit(){
      this.getTransactions();
      this.initForm();
      this.getInfosACcount();
  }

  requestAgain(){
    if (this.formgroup.value.type==="Tout") {
        this.all=true;
        this.getTransactions();
        console.log(this.dateDebut);
    }else{
        this.all=false;
        this.idCurrentUser=this.formgroup.value.type.id;
        this.getTransactions();
        console.log(this.dateFin);
      // console.log(this.formgroup.value.type.id);
    }
  }


initForm(){
    this.formgroup = this.formbuild.group({
        type: ['Tout',[Validators.required]],
        dateDebut:['',[Validators.required]],
        dateFin:['',Validators.required]
  })
}



  detailedTransaction(){
    let transactions:Transaction[]=[]; 
    this.transactionsNoDetailed.map((trans,index)=>{ 
      if (this.all) {
        trans.type="depot";
        transactions.push(trans); 
        if (trans.retraitEffectif){  
            const newTrans={...trans,type:"retrait" };
            transactions.push(newTrans);
        }
      }else {
      if(trans.utilisateurAP.id===this.idCurrentUser) {
        trans.type="depot";
        transactions.push(trans); 
        if (trans.retraitEffectif){  
            const newTrans={...trans,type:"retrait" };
            transactions.push(newTrans);
        }
      }
    }
  })
    this.transactions=transactions;;
  }

  getTransactions(){
    this.depotService.getALlTransactions(this?.dateDebut,this?.dateFin)
        .subscribe(
              data=>{
                this.transactionsNoDetailed = data;
                this.detailedTransaction();
                // console.log(this.transactions);
              },
              error=>{
                console.log(error);
              }
        )
  }

  getInfosACcount(){
    this.depotService.getInfosAccount()
        .subscribe(
          data=>{ 
           this.idCurrentUser=data['idUser'];
           this.usersAgence= data['users'];
          },
          error=>{
            console.log(error);
          })
  }



  moveOnMenu(){

  }


}
