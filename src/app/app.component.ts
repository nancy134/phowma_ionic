import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthService} from '../providers/auth-service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
    templateUrl: 'app.html',
    providers: [AuthService, Storage]
})
export class MyApp {
    rootPage = TabsPage;

    constructor(platform: Platform) {
        console.log("MyApp:constructor");
        platform.ready().then(() => {
            console.log("MyApp:paltform.ready");
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
}
