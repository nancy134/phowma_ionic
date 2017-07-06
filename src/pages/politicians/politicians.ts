import { Component } from '@angular/core';
import { PoliticianService } from '../../providers/politician-service';
import { NetworkService } from '../../providers/network-service';
import { NavController } from 'ionic-angular';
import { PoliticianDetails } from '../politician-details/politician-details';

@Component({
    selector: 'page-politicians',
    templateUrl: 'politicians.html',
    providers: [PoliticianService, NetworkService]
})
export class PoliticiansPage {
    items = [];
	states = [];
    page = 1;
    
    constructor(public navCtrl: NavController,
    public politicianService: PoliticianService) {
        this.politicianService.loadByState(this.page).then(
        data => {
            for (let i = 0; i < data["response"]["data"].length; i++) {
                this.states.push( data["response"]["data"][i]);
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
			this.politicianService.loadByState(this.page).then(
			data => {
				for (let i = 0; i < data["response"]["data"].length; i++) {
					this.states.push( data["response"]["data"][i]);
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
    
    itemTapped(event, politician) {
        console.log("Politicians: itemTapped");
        this.navCtrl.push(PoliticianDetails, {politician: politician});
    }
}
