import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PoliticianDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-politician-details',
  templateUrl: 'politician-details.html',
})
export class PoliticianDetails {
    selectedItem: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.selectedItem = navParams.get('politician');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PoliticianDetails');
    }

}
