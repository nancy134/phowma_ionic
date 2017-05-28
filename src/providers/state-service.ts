import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StateService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StateService {
    public data: any;
    public url: any;
    public req: any;
    constructor(public http: Http) {
        console.log('StateService constructor');
        this.http = http;
        this.url = 'http://dev.phowma.com/api/v1/states';
    }
    loadByName(name) {
        return new Promise(resolve => {
            if (name){
                this.req = this.url+'?name='+name;
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
    loadByAbbreviation(abbreviation) {
        return new Promise(resolve => {
            if (abbreviation){
                this.req = this.url+'?abbreviation='+abbreviation;
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
