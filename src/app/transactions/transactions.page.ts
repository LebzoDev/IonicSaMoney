import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../service/interfaces.service';
import { DepotService } from '../service/depot.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})

export class TransactionsPage implements OnInit {

  idCurrentUser:number;
  allTransactionaActivate=true;
  myOnlyTransactionActivate=false;
  transactions:Transaction[]=[];
  transactionsNoDetailed:Transaction[]=[];
  constructor(
    private router:Router,
    private depotService:DepotService
  ) { }

  ngOnInit() {
    this.getInfosACcount();
    this.getTransactions();
  }

  activateAll(){
    this.allTransactionaActivate=true;
    this.myOnlyTransactionActivate=false;
    this.getTransactions();
  }

  activateMyOnly(){
    this.allTransactionaActivate=false;
    this.myOnlyTransactionActivate=true;
    this.getTransactions();
  }

  detailedTransaction(){
    let transactions:Transaction[]=[]; 
    this.transactionsNoDetailed.map((trans,index)=>{
      if (this.allTransactionaActivate) {
          trans.type="depot";
          transactions.push(trans); 
          if (trans.retraitEffectif){  
              const newTrans={...trans,type:"retrait" };
              transactions.push(newTrans);
        }
        
      }else if(this.myOnlyTransactionActivate){
          console.log(trans.utilisateurAP.id);
          console.log(this.idCurrentUser);
        if (trans.utilisateurAP.id===this.idCurrentUser) {
            trans.type="depot";
            transactions.push(trans); 
            if (trans.retraitEffectif){  
                const newTrans={...trans,type:"retrait" };
                transactions.push(newTrans);
            }
        }

      }
     
    
    })
    this.transactions=transactions;
  }

  getTransactions(){
    this.depotService.getALlTransactions()
        .subscribe(
              data=>{
                
                this.transactionsNoDetailed = data;
                this.detailedTransaction();
                //console.log(data);
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
          },
          error=>{
            console.log(error);
          })
  }

  moveOnMenu(){
    this.router.navigateByUrl('tabs');
  }


}
