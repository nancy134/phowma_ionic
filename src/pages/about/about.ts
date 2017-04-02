import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName, ContactAddress} from 'ionic-native';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(public navCtrl: NavController) {
        //James	Butt	6649 N Blue Gum St	New Orleans	LA	70116	504-621-8927	504-845-1427	jbutt@gmail.com
        //this.addContact('James','Butt', '6649 N Blue Gum St','New Orleans','LA','70116','504-621-8927','504-845-1427','jbutt@gmail.com');
        //Josephine	Darakjy	Chanay, Jeffrey A Esq	4 B Blue Ridge Blvd	Brighton	Livingston	MI	48116	810-292-9388	810-374-9840	josephine_darakjy@darakjy.org	http://www.chanayjeffreyaesq.com
        //this.addContact('Josephine','Darakjy', '4 B Blue Ridge Blvd','Livingston','MI','48116','810-292-9388','810-374-9840','josephine_darakjy@darakjy.org');
        //Art	Venere	Chemel, James L Cpa	8 W Cerritos Ave #54	Bridgeport	Gloucester	NJ	8014	856-636-8749	856-264-4130	art@venere.org	http://www.chemeljameslcpa.com
        //this.addContact('Art','Venere', '8 W Cerritos Ave #54','Bridgeport','NJ','8014','856-636-8749','856-264-4130','art@venere.org');
        //Lenna	Paprocki	Feltz Printing Service	639 Main St	Anchorage	Anchorage	AK	99501	907-385-4412	907-921-2010	lpaprocki@hotmail.com	http://www.feltzprintingservice.com
        //this.addContact('Lenna','Paprocki', '639 Main St','Anchorage','AK','99501','907-385-4412','907-921-2010','lpaprocki@hotmail.com');

        // No address
        //Donette	Foller	Printing Dimensions	34 Center St	Hamilton	Butler	OH	45011	513-570-1893	513-549-4561	donette.foller@cox.net	http://www.printingdimensions.com
        //this.addContact('Donette','Foller', '','','','','513-570-1893','513-549-4561','donette.foller@cox.net');

        // No phone, no e-mail
        //Simona	Morasca	Chapman, Ross E Esq	3 Mcauley Dr	Ashland	Ashland	OH	44805	419-503-2484	419-800-6759	simona@morasca.com	http://www.chapmanrosseesq.com
        //this.addContact('Simona','Morasca', '3 Mcauley Dr','Ashland','OH','44805','','','');

        // Name, email, no phone, no address
        // Name, email, no phone, address
        // Name, email, phone, address
    }
    addContact(first_name, last_name, address, city, state, zip, phone1, phone2, email){
        let contact: Contact = Contacts.create();

        contact.name = new ContactName(null, last_name, first_name);
        contact.phoneNumbers = [new ContactField('mobile', phone1)];
        var contactAddress = new ContactAddress();
        contactAddress.streetAddress = address;
        contactAddress.locality = city;
        contactAddress.region = state;
        var addresses = [];
        addresses.push(contactAddress);
        contact.addresses = addresses;
        contact.save().then(
            () => console.log('Contact saved!', contact),
            (error: any) => console.error(error)
        );  
        
    }

}
