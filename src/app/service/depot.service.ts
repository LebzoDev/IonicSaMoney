import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';
import { Transaction } from './interfaces.service';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http:HttpClient) { }

  postTransaction(transaction:any):Observable<any>{
    return this.http.post(`${apiURL}agence/transactions`,transaction);
  }

  getTransactionByCode(code:string):Observable<any>{
    return this.http.get(`${apiURL}agence/transactions?codeTransaction=${code}`);
  }

  retraitTransaction(transaction:any,id:number):Observable<any>{
    return this.http.put(`${apiURL}agence/transactions/${id}`,transaction);
  }

  getInfosAccount():Observable<any>{
    return this.http.get(`${apiURL}administrateur/getInfos`);
  }

  getALlTransactions(before?:Date,after?:Date):Observable<any>{
    if (before && after) {
      let bef = formatDate(before,'yyyy-MM-dd','en-US');
      let aft = formatDate(after,'yyyy-MM-dd','en-US');
      return this.http.get(`${apiURL}agence/transactions?dateTransaction[after]=${bef}&dateTransaction[before]=${aft}`);
    }else{
      return this.http.get(`${apiURL}agence/transactions`);
    }
   
  }
}
