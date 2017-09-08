import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StateSelector } from './state-selector';

@NgModule({
  declarations: [
    StateSelector,
  ],
  imports: [
    IonicPageModule.forChild(StateSelector),
  ],
  exports: [
    StateSelector
  ]
})
export class StateSelectorModule {}
