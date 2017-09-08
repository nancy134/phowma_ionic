import { Component } from '@angular/core';
import { PoliticianService } from '../../providers/politician-service';
import { NetworkService } from '../../providers/network-service';
import { NavController } from 'ionic-angular';
import { PoliticianDetails } from '../politician-details/politician-details';
import { StateSelector } from '../state-selector/state-selector';
import { ModalController } from 'ionic-angular';

@Component({
    selector: 'page-politicians',
    templateUrl: 'politicians.html',
    providers: [PoliticianService, NetworkService]
})
export class PoliticiansPage {
	states = [];
    page = 1;
    oneState = false;
	
    constructor(public navCtrl: NavController,
    public politicianService: PoliticianService,
	public modalCtrl: ModalController) {
		this.loadData(this.page,null);

    }    
    doInfinite(infiniteScroll) {
		if (this.oneState){
			infiniteScroll.complete();
			return;
		}
        console.log('Begin async operation');

        setTimeout(() => {
			this.loadData(this.page,null);

            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }
	loadData(page, state){
        this.politicianService.loadByState(page,state).then(
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
    itemTapped(event, politician) {
        console.log("Politicians: itemTapped");
        this.navCtrl.push(PoliticianDetails, {politician: politician});
    }
    stateTapped(event, state) {
        console.log("Politicians: stateTapped");
		let modal = this.modalCtrl.create(StateSelector);
		modal.onDidDismiss(data => {
			this.states = [];
			console.log("onDidDismiss data: "+data);
			this.oneState = true;
			this.loadData(1, data.abbreviation);
		});
		modal.present();
    }
}
