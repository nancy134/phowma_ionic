import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ContactDemoPage } from '../pages/contact-demo/contact-demo';
import { ContactDetailsPage } from '../pages/contact-details/contact-details';
import { PoliticianDetails } from '../pages/politician-details/politician-details';
import { StateSelector } from '../pages/state-selector/state-selector';
import { HomePage } from '../pages/home/home';
import { ElectionPage } from '../pages/election/election';
import { PoliticiansPage } from '../pages/politicians/politicians';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ContactDemoPage,
    ContactDetailsPage,
    PoliticianDetails,
	StateSelector,
    HomePage,
    ElectionPage,
    PoliticiansPage,
    AccountPage,
    TabsPage
  ],
  imports: [
    HttpModule,
	BrowserModule,
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
    PoliticianDetails,
	StateSelector,
    HomePage,
    ElectionPage,
    PoliticiansPage,
    AccountPage,
    TabsPage
  ],
  providers: [AdMobFree,
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
