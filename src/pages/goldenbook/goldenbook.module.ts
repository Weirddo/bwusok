import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoldenbookPage } from './goldenbook';

@NgModule({
  declarations: [
    GoldenbookPage,
  ],
  imports: [
    IonicPageModule.forChild(GoldenbookPage),
  ],
})
export class GoldenbookPageModule {}
