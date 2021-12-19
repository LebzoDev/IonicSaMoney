import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { from, pipe} from 'rxjs';
import { switchMap } from 'rxjs/operators'; 
import { AuthentificationService } from './authentification.service';
import { map } from '../../../www/vendor';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements  HttpInterceptor{

  tokenizedReq:any;
  constructor(
    private injector: Injector,
    private authService:AuthentificationService,
    private storage:Storage
    ) { }

    intercept(request:HttpRequest<any>,next:HttpHandler){
      return from(this.storage.get('token'))
          .pipe(
              switchMap(token=>{
                    request = request.clone({
                    setHeaders : {
                      Authorization: `Bearer ${token}`,
                      Accept: 'application/json'
                    }
                  });
                return next.handle(request);
              })
          )
        }

      }
      









      // let authService = this.injector.get(AuthentificationService);
  
       
      // console.log("1111111111111111111111111111111");
      //     console.log('errrrrrr')
      //     console.log(data);
      //     let tokenizedReq = request.clone({
      //       setHeaders : {
      //         Authorization: `Bearer ${this.authService.getToken()}`,
      //         Accept: 'application/json'
      //       }
      //     });
      //     this.tokenizedReq = tokenizedReq;

      //     console.log('token')
      //     console.log(typeof(this.authService.getToken()))
      //     console.log('requete avant:');
      //     console.log(request);
      //      console.log('requete apres:');
      //      console.log(this.tokenizedReq);

      //      console.log("222222222222222222222222222")
      //      if(!this.authService.getToken()){
      //        console.log('33333333333333333333333333333333')
      //        console.log(this.authService.getToken());
      //        this.tokenizedReq = request;
      //      }
          
   

      // asycn token(){
      //     return await next.handle(this.tokenizedReq)
      // }


      // let tokenizedReq = request.clone({
      //   setHeaders : {
      //     Authorization: `Bearer ${this.authService.getToken()}`,
      //     Accept: 'application/json'
      //   }
      // })

   

      
