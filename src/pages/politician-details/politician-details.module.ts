import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoliticianDetails } from './politician-details';

@NgModule({
  declarations: [
    PoliticianDetails,
  ],
  imports: [
    IonicPageModule.forChild(PoliticianDetails),
  ],
  exports: [
    PoliticianDetails
  ]
})
export class PoliticianDetailsModule {}
