import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { ContactPage } from '../contact/contact';
import { ElectionPage } from '../election/election';
import { PoliticiansPage } from '../politicians/politicians';

@Component({
    templateUrl: 'tabs.html',
    providers: []
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = AccountPage;
    tab2Root: any = ContactPage;
    tab3Root: any = PoliticiansPage;
    tab4Root: any = HomePage;
    tab5Root: any = ElectionPage;

    constructor() {
        console.log("TabsPage:constructor");
    }
}
