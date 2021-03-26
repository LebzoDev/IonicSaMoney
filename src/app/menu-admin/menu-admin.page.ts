import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DepotService } from '../service/depot.service';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.page.html',
  styleUrls: ['./menu-admin.page.scss'],
})
export class MenuAdminPage implements OnInit,OnDestroy {


  subscription:any;
  displayMoney:boolean=false;
  techs:any[]=[];

  solde:number;
  constructor(
      private router:Router,
      private storage:Storage,
      private depotService:DepotService,
      private dataService:DataServiceService){}
  

  ngOnInit() {
    this.getInfosACcount();
    console.log("constructor");
  }

  // ngDoCheck(){
  //   console.log("ngOnChange");
  // }

  // ngAfterContentChecked(){
  //   console.log('see')
  // }

  // ngAfterViewChecked(){
  //   // this.getInfosACcount();
  //   console.log('see-again');
  // }


  ngOnDestroy(){
      console.log('fin')
  }


  ionViewWillEnter(){
    console.log("1");
  }

  ionViewDidEnter(){
    console.log("2");
    this.getInfosACcount();
    this.dataService.changeSolde(this.solde);
    console.log('solde-apres-apres:'+this.solde)
    // this.subscription = this.dataService.currentMessage.subscribe((solde:any) => this.solde = solde);
  }

  ionViewWillLeave(){
    console.log("3");
  }

  ionViewDidLeave(){
    console.log("4");
  }

  manageDisplayMoney(){
   
    this.getInfosACcount();
    this.displayMoney=!this.displayMoney;
  }

  moveOnMenu(){
      this.router.navigateByUrl('back-admin');
  }

  moveOn(page:any){
      this.router.navigateByUrl(page);
  }

  disconnect(){
    this.storage.clear();
    this.router.navigateByUrl('login');
  }

  getInfosACcount(){
    this.depotService.getInfosAccount()
        .subscribe(
          data=>{
           console.log(data);
            if (!data['detailsCompte']['statut']) {
              this.solde = data['detailsCompte']['solde'];
            }
            // console.log(typeof(data['detailsCompte']['solde']))
          },
          error=>{
            console.log(error);
          })
  }

}
