import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NetworkService } from '../../providers/network-service';

@Component({
    selector: 'page-contact-details',
    templateUrl: 'contact-details.html',
    providers: [NetworkService]
})
export class ContactDetailsPage {
    selectedItem: any;
    public hasRepresentative: boolean = false;
    congressman : any;
    constructor(
    public navCtrl: NavController,
    public networkService: NetworkService,
    public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }
    ionViewWillEnter() {
        console.log("congressmen.length: "+this.selectedItem.congressmen.length);
        var url = "http://dev.phowma.com/api/v1/districts/find?zip="+this.selectedItem.zip+"&address="+this.selectedItem.address+"&city="+this.selectedItem.city+"&state="+this.selectedItem.state
        var url = "http://dev.phowma.com/api/v1/districts/find?"
        if (this.selectedItem.zip) url = url + "&zip=" + this.selectedItem.zip
        if (this.selectedItem.address) url = url + "&address=" + this.selectedItem.address
        if (this.selectedItem.city) url = url + "&city=" + this.selectedItem.city
        if (this.selectedItem.state) url = url + "&state=" + this.selectedItem.state
        
        this.networkService.get(url).then(
        data => {
            console.log("district data: "+JSON.stringify(data));
            console.log("district: "+data["response"]["data"]["district"]);
            console.log("state: "+data["response"]["data"]["state"]);
            if (data["response"]["data"]["district"]){
                for (var i=0; i<this.selectedItem.congressmen.length; i++){
                    console.log("congressman district: "+this.selectedItem.congressmen[i]["district"]);
                    console.log("selectItem type: "+Object.prototype.toString.call(this.selectedItem.congressmen[i]["district"]));
                    console.log("data type: "+Object.prototype.toString.call(data["response"]["data"]["district"]));
                    if (this.selectedItem.congressmen[i]["district"] == parseInt(data["response"]["data"]["district"])){
                        this.congressman = {};
                        this.congressman["first_name"] = this.selectedItem.congressmen[i].first_name;
                        this.congressman["last_name"] = this.selectedItem.congressmen[i].last_name;
                        this.congressman["picture"] = this.selectedItem.congressmen[i].picture;
                        this.congressman["party"] = this.selectedItem.congressmen[i].party;
                        this.hasRepresentative = true;
                    }
                }
            } else {
                console.log("message: "+data["response"]["data"]["message"]);
            }
        },
        err => {
        });
    }  
}
