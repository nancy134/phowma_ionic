import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ContactDemoPage } from '../pages/contact-demo/contact-demo';
import { ContactDetailsPage } from '../pages/contact-details/contact-details';
import { HomePage } from '../pages/home/home';
import { ElectionPage } from '../pages/election/election';
import { PoliticiansPage } from '../pages/politicians/politicians';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ContactDemoPage,
    ContactDetailsPage,
    HomePage,
    ElectionPage,
    PoliticiansPage,
    AccountPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ContactDemoPage,
    ContactDetailsPage,
    HomePage,
    ElectionPage,
    PoliticiansPage,
    AccountPage,
    TabsPage
  ],
  providers: [Storage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
