import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { Contacts, ContactFindOptions, ContactFieldType} from "ionic-native";
import { StateService} from '../../providers/state-service';
import { Storage } from '@ionic/storage';
import { parse} from 'libphonenumber-js';

@Component({
  selector: 'page-contact-demo',
  templateUrl: 'contact-demo.html',
  providers: [StateService, Storage]
})
export class ContactDemoPage {
    tab: Tabs;
    selectedItem: any;
    icons: string[];
    items: Array<{
        name: string, 
        icon1: string, 
        icon2: string, 
        icon3: string, 
        icon4: string, 
        icon5: string, 
        color1: string, 
        color2: string,
        color3: string,
        color4: string,
        color5: string
    }>;
    public states: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public stateService: StateService, public storage: Storage) {
        // If we navigated to this page, we will have an item available as a nav param
        //this.selectedItem = navParams.get('item');
        this.tab = this.navCtrl.parent;
        
        this.items = [];
        const options = new ContactFindOptions();
        options.filter = '';
        options.multiple = true;
        options.hasPhoneNumber = false;
        const desiredFields: ContactFieldType[] = ['id', 'name', 'addresses', 'phoneNumbers'];
        options.desiredFields = desiredFields; 
        const fields: ContactFieldType[] = ['name'];
        Contacts.find(fields, options).then(contacts => {
            var total = 0;
            if (contacts.length > 6) total = 6;
            else total = contacts.length;
            for (let i=0; i<total; i++){
                var state = '';

                // Find state in address
                if (contacts[i].addresses && contacts[i].addresses.length >= 1){
                    state = contacts[i].addresses[0].region;
                }
                
                // Find state in phone numbers
                if (state.length == 0){
                    if (contacts[i].phoneNumbers){
                        for (let j=0; j<contacts[i].phoneNumbers.length; j++){
                            var a = parse(contacts[i].phoneNumbers[j].value, {country: { default: 'US' }});
                            var area_code = a.phone.substr(3,3);
                            storage.get(area_code).then((area_code_json) => {
                                if (area_code_json){
                                    var area_code_data = JSON.parse(area_code_json);
                                    if (area_code_data.state_name){            
                                        this.addItemToList(contacts[i],area_code_data.state_name);
                                    }
                                }
                            }); 
                        }
                    }
                } else {
                    this.addItemToList(contacts[i],state);
                }
            }    
        });
    }
    addItemToList(contact,state){
        var i1,i2,i3,i4;
        var c1,c2,c3,c4;
        i1 = 'star-outline';
        c1 = 'black';
        i2 = 'star-outline';
        c2 = 'black';
        i3 = 'star-outline';
        c3 = 'black';
        i4 = 'star-outline';
        c4 = 'black';
        this.storage.get(state).then((stateStr) => {
            if (stateStr){
                JSON.stringify("stateStr: "+stateStr);
                var stateData = JSON.parse(stateStr);
                if (stateData.stars[0] < 50){
                    i1 = 'star';
                    c1 = 'red';
                }else {
                    i1 = 'star';
                    c1 = 'blue';
                }
                if (stateData.stars[1] < 50){
                    i2 = 'star';
                    c2 = 'red';
                }else {
                    i2 = 'star';
                    c2 = 'blue';
                }
                if (stateData.stars[2] < 50){
                    i3 = 'star';
                    c3 = 'red';
                }else {
                    i3 = 'star';
                    c3 = 'blue';
                }
                if (stateData.stars[3] < 50){
                    i4 = 'star';
                    c4 = 'red';
                }else {
                    i4 = 'star';
                    c4 = 'blue';
                }
            }
            this.items.push({
                name: contact.name.formatted+" ("+stateData.abbreviation+")",
                icon1: i1, icon2: i2, icon3: i3, icon4: i4, icon5: 'star-outline',
                color1: c1, color2: c2, color3: c3, color4: c4, color5: 'black' 
            });
        });
    }
    getMore(){
        this.tab.select(2);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ContactDemoPage');
    }

}
