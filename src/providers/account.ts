import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from '../providers/auth';


/*
  Generated class for the Account provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Account {
    public data: any;
    public headers: any;

    constructor(public http: Http, public auth: Auth) {
        console.log('Hello Account Provider');
        this.data = null;
    }
    signin() {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data).catch(e => console.error(e)); 
        }

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.

            //var json = JSON.stringify({ email: 'nancy_piedra@hotmail.com', password: 'tweety123'});
            var data = "email=nancy_piedra@yahoo.com&password=tweety123";
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.post('http://dev.phowma.com/api/v1/auth/sign_in',data,{headers: headers})
            .map(res => {
                console.log("res: "+JSON.stringify(res));
                this.auth.storeHeaders(res.headers);
                console.log("res.headers.get.client: "+res.headers.get("client"));
                console.log("res.headers.get.access-token: "+res.headers.get("access-token"));
                console.log("res.headers.get.token-type: "+res.headers.get("token-type"));
                console.log("res.headers.get.expiry: "+res.headers.get("expiry"));
                console.log("res.headers.get.uid: "+res.headers.get("uid"));
                console.log("res.text: "+res.text());
                return res.json();
            })
            .subscribe(data => {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                this.data = data;
                console.log("data: "+JSON.stringify(data));
                resolve(this.data);
            });
        }).catch(e => console.error(e)); 
    }

}
