import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { StateService } from '../providers/state-service';
import { AreaCode } from '../providers/area-code';
import { Storage } from '@ionic/storage';


@Component({
    templateUrl: 'app.html',
    providers: [StateService, AreaCode, Storage]
})
export class MyApp {
    rootPage = TabsPage;
    public states: any;
    public area_codes: any;

    constructor(platform: Platform, public stateService: StateService, public storage: Storage, public areaCode: AreaCode) {
        console.log("MyApp:constructor");
        platform.ready().then(() => {
            console.log("MyApp:paltform.ready");
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.stateService.load().then(data => {
                this.states = data;
                for (var i=0; i<this.states.length; i++){
                    this.storage.set(this.states[i].name,JSON.stringify(this.states[i]));
                    this.storage.set(this.states[i].abbreviation,JSON.stringify(this.states[i]));
                }
                this.areaCode.load().then(data => {
                    this.area_codes = data;
                    for (var i=0; i<this.area_codes.length; i++){
                        console.log("this.area_codes[i].code: "+this.area_codes[i].code);
                        this.storage.set(this.area_codes[i].code,JSON.stringify(this.area_codes[i]));
                    }
                    StatusBar.styleDefault();
                    Splashscreen.hide();
                });
            });
            
        });
    }
}
