import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';
import {Contacts, ContactFindOptions, ContactFieldType} from "ionic-native";
import {StateService} from '../../providers/state-service';
import { Storage } from '@ionic/storage';
import {parse} from 'libphonenumber-js';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [StateService, Storage]
})
export class ContactPage {
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

        this.items = [];
        const options = new ContactFindOptions();
        options.filter = '';
        options.multiple = true;
        options.hasPhoneNumber = false;
        const desiredFields: ContactFieldType[] = ['name', 'addresses', 'phoneNumbers'];
        options.desiredFields = desiredFields; 
        const fields: ContactFieldType[] = ['name'];
        Contacts.find(fields, options).then(contacts => {
            for (let i=0; i<contacts.length; i++){
                console.log("name: "+contacts[i].name.formatted);
                var state = '';

                // Find state in address
                if (contacts[i].addresses && contacts[i].addresses.length >= 1){
                    state = contacts[i].addresses[0].region;
                    console.log("state: "+state);
                }
                
                // Find state in phone numbers
                if (state.length == 0){
                    if (contacts[i].phoneNumbers){
                        for (let j=0; j<contacts[i].phoneNumbers.length; j++){
                            console.log("contacts[i].phoneNumbers[j].type: "+contacts[i].phoneNumbers[j].type);
                            console.log("contacts[i].phoneNumbers[j].value: "+contacts[i].phoneNumbers[j].value);
                            var a = parse(contacts[i].phoneNumbers[j].value, {country: { default: 'US' }});
                            console.log("a.country: "+a.country);
                            console.log("a.phone: "+a.phone);
                            var area_code = a.phone.substr(3,3);
                            console.log("area_code: "+area_code);
                            var area_code_json = '';
                            storage.get(area_code).then((area_code_json) => {
                                console.log("area_code_json: "+area_code_json);
                                if (area_code_json){
                                    var area_code_data = JSON.parse(area_code_json);
                                    console.log("area_code_data.state_name: "+area_code_data.state_name);
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
        var stateStr = "";
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
    itemTapped(event, item) {
        this.navCtrl.push(ContactDetailsPage, {
            item: item
        });
    }

}
