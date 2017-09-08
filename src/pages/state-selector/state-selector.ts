import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StateService } from '../../providers/state-service';
import { NetworkService } from '../../providers/network-service';

/**
 * Generated class for the StateSelector page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-state-selector',
	templateUrl: 'state-selector.html',
    providers: [StateService, NetworkService]
	
})
export class StateSelector {
	public states: any;
	public state: any;
	constructor(public navCtrl: NavController, 
	public viewCtrl: ViewController,
	public stateService: StateService,
	public navParams: NavParams) {
        this.stateService.loadList().then(
        data => {
			console.log("state list: "+JSON.stringify(data));
			this.states = data;
        },
        err => {
            console.log("PoliticiansPage err: "+err);
        });
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StateSelector');
	}
    stateTapped(state) {
        console.log("StateSelector: stateTapped");
		this.state = state;
		this.dismiss();
    }

	dismiss() {
		this.viewCtrl.dismiss(this.state);		
	}
}
