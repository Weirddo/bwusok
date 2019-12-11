import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { MessageService } from '../../services/MessageService';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the GoldenbookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goldenbook',
  templateUrl: 'goldenbook.html',
})
export class GoldenbookPage {
messages: Array<any>;
data:any= {};
        ref_utilisateur:string=null;
refevent:string=null;
 bgurl:string=null;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private messageService: MessageService, public http: Http,public storage: Storage) {
  /*INIT CHAMP TEXTE*/
  this.data.content='';
storage.get('refutilid').then((datatest)=>{

            this.ref_utilisateur =datatest;
            //alert(this.ref_utilisateur);
});
storage.get('bgurl').then((bgurl)=>{

            this.bgurl =bgurl;
            //alert(this.ref_utilisateur);
});

/*INIT CONNECTION*/
this.http=http;

 /*INIT FEED MESSAGES*/
  storage.get('refevent').then((refevent)=>{
this.refevent =refevent;
this.read();
       /*setInterval(function(){ this.read();
     
    }, 1000);*/
      setInterval(() => { 
   this.read(); // Now the "this" still references the component
}, 5000);
    
});
       
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad GoldenbookPage');
  }

  ionViewDidEnter(){
  this.storage.get('refevent').then((refevent)=>{
this.refevent =refevent;
this.read();
});
    }

    submit(){
 var link = 'http://93.115.97.208/bwus/message/create.php';
 var myData = JSON.stringify({content: this.data.content,ref_utilisateur: this.ref_utilisateur,refevent: this.refevent});
    alert(myData);
 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
 // console.log(data.response);
 }, error => {
 console.log("Oooops!");
 });
this.navCtrl.push(GoldenbookPage);
    }

read(){
var link = 'http://93.115.97.208/bwus/message/read.php';
var myData = JSON.stringify({refevent: this.refevent});
this.http.post(link, myData).subscribe(data => {
 this.messages = data.json().results;
    //alert(this.messages);
 }, error => {
 console.log("Oooops!");
 });
    }


}
