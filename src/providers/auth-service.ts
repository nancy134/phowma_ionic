import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

    constructor(public http: Http, public storage: Storage) {
        console.log('Hello Auth Provider');
    }
    storeHeaders(headers){
        console.log("headers.get.client: "+headers.get("client"));
        console.log("headers.get.access-token: "+headers.get("access-token"));
        console.log("headers.get.token-type: "+headers.get("token-type"));
        console.log("headers.get.expiry: "+headers.get("expiry"));
        console.log("headers.get.uid: "+headers.get("uid"));
        if (headers.get("access-token") != null){
            this.storage.set("client",headers.get("client"));
            this.storage.set("access-token",headers.get("access-token"));
            this.storage.set("token-type",headers.get("token-type"));
            this.storage.set("expiry",headers.get("expiry"));
            this.storage.set("uid",headers.get("uid"));
        }
    }
    getHeaders2(){
        return Promise.all([
           this.storage.get('client'),
           this.storage.get('access-token'),
           this.storage.get('token-type'),
           this.storage.get('expiry'),
           this.storage.get('uid'),
        ])
         .then(([client,access_token,token_type,expiry,uid]) => {
           var headers = new Headers();
           headers.append('client',client);
           headers.append('access-token',access_token);
           headers.append('token-type',token_type);
           headers.append('expiry',expiry);
           headers.append('uid',uid);
           return headers;
         });
        
    }
    getHeaders(){
    
        return Promise.all([
           this.storage.get('client'),
           this.storage.get('access-token'),
        ])
         .then(([val1,val2]) => {
           console.log(val1 + " " + val2); //values work here
           return [val1,val2];
         });
    }
}
