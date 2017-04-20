import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ContactDetailsPage } from '../pages/contact-details/contact-details';
import { HomePage } from '../pages/home/home';
import { ElectionPage } from '../pages/election/election';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ContactDetailsPage,
    HomePage,
    ElectionPage,
    AccountPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ContactDetailsPage,
    HomePage,
    ElectionPage,
    AccountPage,
    TabsPage
  ],
  providers: [Storage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
