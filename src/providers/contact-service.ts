import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from '../providers/auth';

/*
  Generated class for the ContactService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactService {
    public data: any;

    constructor(public http: Http, public auth: Auth) {
        console.log('Hello ContactService Provider');
    }
    contacts() {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data).catch(e => console.error(e)); 
        }

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            //var headers = this.auth.getHeaders();
            this.auth.getHeaders2().then((headers) => {
                this.http.get('http://dev.phowma.com/api/v1/contacts',{headers:headers})
                .map(res => {
                    console.log("res: "+JSON.stringify(res));
                    this.auth.storeHeaders(res.headers);
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
            });
        }).catch(e => console.error(e)); 
    }
}
