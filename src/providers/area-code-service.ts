import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AreaCodeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AreaCodeService {
    public data: any;
    public url: any;
    public req: any;

    constructor(public http: Http) {
        console.log('AreaCodeService constructure');
        this.http = http;
        this.url = 'http://dev.phowma.com/api/v1/area_codes';
    }
    loadByCode(code) {
        return new Promise(resolve => {
            if (code){
                this.req = this.url+'?code='+code;
            } else {
                this.req = this.url;
            }
            this.http.get(this.req)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            });
        }).catch(e => console.error(e)); 
    }

}
