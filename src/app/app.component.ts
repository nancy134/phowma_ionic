import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { StateService } from '../providers/state-service';
import { AreaCodeService } from '../providers/area-code-service';
import { AuthService } from '../providers/auth-service';
import { Storage } from '@ionic/storage';
import {Contacts, ContactFindOptions, ContactFieldType} from "ionic-native";


@Component({
    templateUrl: 'app.html',
    providers: [StateService, AreaCodeService, Storage, AuthService]
})
export class MyApp {
    rootPage = TabsPage;
    public states: any;
    public area_codes: any;

    constructor(platform: Platform, public stateService: StateService, public storage: Storage, public areaCodeService: AreaCodeService) {
        console.log("MyApp:constructor");
        platform.ready().then(() => {
            console.log("MyApp:paltform.ready");
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.stateService.load().then(data => {
                console.log("Processing states");
                this.states = data;
                for (var i=0; i<this.states.length; i++){
                    this.storage.set(this.states[i].name,JSON.stringify(this.states[i]));
                    this.storage.set(this.states[i].abbreviation,JSON.stringify(this.states[i]));
                }
                this.areaCodeService.load().then(data => {
                    console.log("Processing area codes");
                    this.area_codes = data;
                    for (var i=0; i<this.area_codes.length; i++){
                        this.storage.set(this.area_codes[i].code,JSON.stringify(this.area_codes[i]));
                    }
                    console.log("Processing contacts");
                    const options = new ContactFindOptions();
                    options.filter = '';
                    options.multiple = true;
                    options.hasPhoneNumber = false;
                    const desiredFields: ContactFieldType[] = ['id'];
                    options.desiredFields = desiredFields; 
                    const fields: ContactFieldType[] = ['id'];
                    Contacts.find(fields, options).then(contacts => {
                        console.log(contacts.length+" contacts found");
                        for (let i=0; i<contacts.length; i++){
                            console.log("id: "+contacts[i].id);
                        }
                        StatusBar.styleDefault();
                        Splashscreen.hide();
                    });
                });
            });
            
        });
    }
}
