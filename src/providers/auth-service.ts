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
        console.log('AuthService constructor');
    }
    storeHeaders(response){
        var storage = this.storage;
        var storeHeadersL = function (headers) {
           console.log("store access_token: "+headers.get("access-token"));

            return Promise.all([
                storage.set("client",headers.get("client")),
                storage.set("access-token",headers.get("access-token")),
                storage.set("token-type",headers.get("token-type")),
                storage.set("expiry",headers.get("expiry")),
                storage.set("uid",headers.get("uid"))
            ])
            //.then(([client,access_token,token_type,expiry,uid]) => {
            .then(() => {
            });
        };

        return new Promise(
            function (resolve, reject) {
                var i = response["headers"].get("Status").indexOf("304");
                var access_token = response["headers"].get("access-token");
                if (access_token) access_token = access_token.trim();
                
                //if (access_token != null && i!=0 && access_token.length > 0){
                if (access_token != null && access_token.length > 0){
                    storeHeadersL(response["headers"]).then(abc => {
                        resolve(response["data"]);
                    });
                } else {
                    resolve(response["data"]);
                }
            }
        );
    }
    getHeaders(){
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
           console.log("get access_token: "+access_token);
           headers.append('token-type',token_type);
           headers.append('expiry',expiry);
           headers.append('uid',uid);
           return headers;
         });
        
    }
}
