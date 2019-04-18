import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseventPage } from './choosevent';

@NgModule({
  declarations: [
    ChooseventPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseventPage),
  ],
})
export class ChooseventPageModule {}
