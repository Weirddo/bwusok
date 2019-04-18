import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfirmPage } from '../confirm/confirm';
import { GoldenbookPage } from '../goldenbook/goldenbook';
import { ListPage } from '../list/list';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    wednom:string=null;
title:string=null;
    bgurl:string=null;
    refevent:string=null;
    answer:string=null;
private imageSrc: string;
  constructor(public navCtrl: NavController,public storage: Storage) {
      
 storage.get('wednom').then((wednom)=>{
            this.wednom =wednom;
    
});
      
storage.get('title').then((title)=>{
            this.title =title;
});
      
      storage.get('bgurl').then((bgurl)=>{
            this.bgurl =bgurl;
});

        storage.get('refevent').then((refevent)=>{
            this.refevent =refevent;
});
      
       /*storage.get('answer').then((answer)=>{
            this.answer =answer;
           
});*/
      
  }

   openConfirm(): void {
        this.navCtrl.push(ConfirmPage);
    }

    openList(): void {
        this.navCtrl.push(ListPage);
    }

    openGoldenBook(): void {
        this.navCtrl.push(GoldenbookPage);
    }





}
