import { Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';
import { Contacts, ContactFindOptions, ContactFieldType} from "ionic-native";
import { StateService} from '../../providers/state-service';
import { ContactService } from '../../providers/contact-service';
import { AccountService} from '../../providers/account-service';
import { NetworkService} from '../../providers/network-service';
import { Storage } from '@ionic/storage';
import { parse} from 'libphonenumber-js';
import { AreaCodeService } from '../../providers/area-code-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [StateService, Storage, AccountService, AreaCodeService, ContactService, NetworkService]
})
export class ContactPage {
    tab: Tabs;
    selectedItem: any;
    icons: string[];
    nextPage: any;

    items: Array<{
        name: string, 
        displayName: string,
        phoneNumber: string,
        address: string,
        city: string,
        state: string,
        zip: string,
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
    public isSignedIn: boolean = false;
    public area_codes: any;
    public phone_ids: any;

    constructor(
        public platform: Platform,
        public navCtrl: NavController,
        public navParams: NavParams, 
        public stateService: StateService,
        public storage: Storage, 
        public contactService: ContactService,
        public areaCodeService: AreaCodeService, 
        public networkService: NetworkService, 
        public accountService: AccountService) {
        // If we navigated to this page, we will have an item available as a nav param
        //this.selectedItem = navParams.get('item');
        console.log("ContactPage constructor");
        this.tab = this.navCtrl.parent;
        this.items = [];
    }
    itemTapped(event, item) {
        this.navCtrl.push(ContactDetailsPage, {
            item: item
        });
    }
    ionViewWillEnter() {
        console.log("ionviewwillenter");
        this.platform.ready().then(() => {
            this.networkService.isSignedIn().then(data => {
                if ((data["response"]["data"]["status"].localeCompare("ok") == 0) && this.isSignedIn == false){
                    this.isSignedIn = true;
                    this.contactService.all().then(data => {
                        this.getContactsFromServer();
                    });
                }else if ((data["response"]["data"]["status"].localeCompare("ok") != 0) && this.isSignedIn == true){
                    this.isSignedIn = false;
                    this.getContacts();
                }
            },
            err => {
                console.log("err: "+JSON.stringify(err));
                this.isSignedIn = false;
                this.getContacts();
                
            });
        });
    }
    getContacts(){
        const options = new ContactFindOptions();
        options.filter = '';
        options.multiple = true;
        options.hasPhoneNumber = false;
        const desiredFields: ContactFieldType[] = ['id', 'name', 'addresses', 'phoneNumbers'];
        options.desiredFields = desiredFields; 
        const fields: ContactFieldType[] = ['name'];
        Contacts.find(fields, options).then(contacts => {
            var total = 0;
            if (!this.isSignedIn && contacts.length > 6) total = 6;
            else total = contacts.length;
            for (let i=0; i<total; i++){
                this.addContactToList(contacts[i]);
            }    
        });

    }
    public addContactToList(contact){
        var state = '';

        // Find state in address
        if (contact.addresses && contact.addresses.length >= 1){
            state = contact.addresses[0].region;
        }
                
        // Find state in phone numbers
        if (state.length == 0){
            if (contact.phoneNumbers){
                for (let j=0; j<contact.phoneNumbers.length; j++){
                    var a = parse(contact.phoneNumbers[j].value, {country: { default: 'US' }});
                    var area_code = a.phone.substr(0,3);

                    this.areaCodeService.loadByCode(area_code).then(area_code_data => {
                        if (area_code_data[0]){
                            if (area_code_data[0].state_name){            
                                this.addItemToList(contact,area_code_data[0].state_name);
                            }
                        }
                    }); 
                }
            }
        } else {
            this.addItemToList(contact,state);
        }
    }
    addItemToList(contact,state){
        if (state.length == 2){
            this.stateService.loadByAbbreviation(state).then(stateData => {
                if (stateData){
                    this.createContactItem(contact,stateData[0]);
                }
            });
        }else {
            this.stateService.loadByName(state).then(stateData => {
                if (stateData){
                    this.createContactItem(contact,stateData[0]);
                }
            });
        }
    }
    createContactItem(contact,stateData){
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
        var phoneNumber = "";
        if (contact.phoneNumbers){
            if (contact.phoneNumbers.length > 0){
                phoneNumber = contact.phoneNumbers[0].value;
            }
        }
        var state = "";
        var city = "";
        var zip = "";
        var address = "";
        if (contact.addresses && contact.addresses.length >= 1){
            address = contact.addresses[0].streetAddress;
            state = contact.addresses[0].region;
            city = contact.addresses[0].locality;
            zip = contact.addresses[0].postalCode;
        }

        this.items.push({
            name: contact.name.formatted+" ("+stateData.abbreviation+")",
            displayName: contact.displayName,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            state: state,
            zip: zip,
            icon1: i1, icon2: i2, icon3: i3, icon4: i4, icon5: 'star-outline',
            color1: c1, color2: c2, color3: c3, color4: c4, color5: 'black' 
        });
    }
    getContactsFromServer(){
        var parallel = this.parallel;
        var phone_ids = this.phone_ids;
        phone_ids = [];
       
        this.contactService.contacts( 'http://dev.phowma.com/api/v1/contacts/?page=1').then(data => {
            var responseData = data["response"]["data"];
            var headers = data["response"]["headers"];
            this.parseLinkHeader(headers.get("Link"));
            var length = Object.keys(responseData).length;
            for (var i=0; i<length; i++){
                phone_ids.push(responseData[i].phone_id);
            }
            parallel(phone_ids).then(objs => {
                var length = Object.keys(objs).length;
                for (var i=0; i<length; i++){
                    this.addContactToList(objs[i]);
                }
                //this.page++;
            });
        });


    }
    getMore(){
        this.tab.select(0);
    }
    public parallel(phone_ids){
        var asyncFunc = function(e) {
        return new Promise(
            function (resolve, reject) {
                const options = new ContactFindOptions();
                options.filter = e;
                options.multiple = false;
                options.hasPhoneNumber = false;
                const desiredFields: ContactFieldType[] = ['id', 'name', 'addresses', 'phoneNumbers'];
                options.desiredFields = desiredFields; 
                const fields: ContactFieldType[] = ['id'];
                Contacts.find(fields, options).then(contacts => {
                    resolve(contacts[0]);
                },
                err => {
                    reject("Error");
                });
            }
        );
        }

        var abcd = [];
        var workMyCollection = (phone_ids) => {
            return phone_ids.reduce((promise, item) => {
                return promise
                .then((result) => {
                    return asyncFunc(item).then(result => abcd.push(result));
                })
                .catch(console.error);
            }, Promise.resolve());
        }
        return new Promise(
            function (resolve, reject) {

        workMyCollection(phone_ids)
            .then(() => {
                resolve(abcd);
             });
        });
    }
    doInfinite(infiniteScroll) {
        if (!this.nextPage) {
            infiniteScroll.complete();
            return;
        }
        setTimeout(() => {
            this.contactService.contacts(this.nextPage).then(
            data => {
                var headers = data["response"]["headers"];
                var responseData = data["response"]["data"];
                this.parseLinkHeader(headers.get("Link"));
                var phone_ids = [];
                var length = Object.keys(responseData).length;
                for (var i=0; i<length; i++){
                    phone_ids.push(responseData[i].phone_id);
                }
                this.parallel(phone_ids).then(objs => {
                    var length = Object.keys(objs).length;
                    for (var i=0; i<length; i++){
                        this.addContactToList(objs[i]);
                    }
                    //this.page++;
                });
            },
            err => {
                console.log("ContactsPage err: "+err);
            });

            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }
parseLinkHeader(link) {
    var linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
    var paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;

    var matches = link.match(linkexp);
    var rels = {};
    for (var i = 0; i < matches.length; i++) {
        var split = matches[i].split('>');
        var href = split[0].substring(1);
        var ps = split[1];
        var s = ps.match(paramexp);
        for (var j = 0; j < s.length; j++) {
            var p = s[j];
            var paramsplit = p.split('=');
            var name = paramsplit[0];
            var rel = paramsplit[1].replace(/["']/g, '');
            rels[rel] = href;
        }
    }
    console.log("rels[last]: "+rels["last"]);
    console.log("rels[first]: "+rels["first"]);
    console.log("rels[prev]: "+rels["prev"]);
    console.log("rels[next]: "+rels["next"]);
    this.nextPage = rels["next"];
    return rels;
}
}
