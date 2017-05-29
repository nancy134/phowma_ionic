import { Component } from '@angular/core';
import { PoliticianService } from '../../providers/politician-service';
import { NetworkService } from '../../providers/network-service';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-politicians',
    templateUrl: 'politicians.html',
    providers: [PoliticianService, NetworkService]
})
export class PoliticiansPage {
    items = [];
    page = 1;
    
    constructor(public navCtrl: NavController,
    public politicianService: PoliticianService) {
        
        this.politicianService.loadAll(this.page,null).then(
        data => {
            console.log("PoliticiansPage data: "+JSON.stringify(data["response"]["data"]));
            console.log("PoliticiansPage data.length: "+data["response"]["data"].length);
            for (let i = 0; i < data["response"]["data"].length; i++) {
                //this.items.push( this.items.length );
                this.items.push( data["response"]["data"][i].last_name);
            }
            ++this.page;
        },
        err => {
            console.log("PoliticiansPage err: "+err);
        });
        
    }    
    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
            //for (let i = 0; i < 30; i++) {
            //    this.items.push( this.items.length );
            //}
            this.politicianService.loadAll(this.page,null).then(
            data => {
                console.log("PoliticiansPage data: "+JSON.stringify(data["response"]["data"]));
                console.log("PoliticiansPage data.length: "+data["response"]["data"].length);
                for (let i = 0; i < data["response"]["data"].length; i++) {
                    //this.items.push( this.items.length );
                    this.items.push( data["response"]["data"][i].last_name);
                }
                ++this.page;
            },
            err => {
                console.log("PoliticiansPage err: "+err);
            });

            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }
    
}
