import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkService } from '../providers/network-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the StateService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PoliticianService {
    public data: any;
    public url: any;
    constructor(public http: Http,
    public networkService: NetworkService) {
        console.log('PoliticianService constructor');
        this.http = http;
        this.url = 'http://dev.phowma.com/api/v1/politicians';
    }
    loadAll2() {
        return new Promise(resolve => {
            this.http.get(this.url)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            });
        }).catch(e => console.error(e)); 
    }
    loadAll(page,state) {
        var networkService = this.networkService;
        return new Promise(
            function (resolve, reject) {
                
                var url = 'http://dev.phowma.com/api/v1/politicians?page='+page;
                if (state){
                    url = 'http://dev.phowma.com/api/v1/politicians?page='+page+"&state="+state;
                }
                networkService.get(url).then(
                data => {
                    console.log("politician-service data: "+JSON.stringify(data));
                    resolve(data);
                },
                err => {
                    reject(err);
                });
            }
        )
    }
	loadByState(page,state){
        var networkService = this.networkService;
        return new Promise(
            function (resolve, reject) {
				var url;
                if (state) {
					url = 'http://dev.phowma.com/api/v1/states?per_page=5&page='+page+"&abbreviation="+state;
				}else{
					url = 'http://dev.phowma.com/api/v1/states?per_page=5&page='+page;
				}
                networkService.get(url).then(
                data => {
                    resolve(data);
                },
                err => {
                    reject(err);
                });
            }
        )
	}
}
