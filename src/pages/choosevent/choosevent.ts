import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { EventsService } from '../../services/EventsService';
/**
 * Generated class for the ChooseventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choosevent',
  templateUrl: 'choosevent.html',
})
export class ChooseventPage {
    events: Array<any>;
    eventid:string=null;
    data:any= {};
    bgurl:string=null;
    refutilid:string=null;
    title:string=null;
    firstcolor:string=null;
    
  constructor(public navCtrl: NavController,public storage: Storage, private eventService: EventsService,public navParams: NavParams,public http: Http) {
      storage.get('refutilid').then((refutilid)=>{

            this.refutilid =refutilid;
           // alert(this.refutilid);
});
  }
    
    
  
  ionViewDidLoad() {
    this.storage.get('refutilid').then((refutilid)=>{
            this.refutilid =refutilid;
      console.log(this.refutilid);
        });
  }
    
    openHome(): void {
        this.navCtrl.push(TabsPage);
    }
    
    
      

    
  ionViewDidEnter(){
  this.storage.get('refutilid').then((refutilid)=>{
            this.refutilid =refutilid;
      console.log(this.refutilid);
      this.readAll()
});
    }
    
    readAll(){
var link = 'http://93.115.97.208/bwus/events/read.php';
var myData = JSON.stringify({refutilid: this.refutilid});
this.http.post(link,myData).subscribe(data => {
 this.events = data.json().results;
 }, error => {
 console.log("Oooops!");
 });
    }
    
    
    
      submit(eventid){
     // this.setData();
    //  this.getData();
      //Lien vers REST LOGIN API
 var link = 'http://93.115.97.208/bwus/loadevent.php';
      //Lien vers REST LOGIN API
 var myData = {eventid:eventid};
//alert(myData);
 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
  //alert(this.data.response);


      
this.storage.set('refevent',this.data.response.split('-')[0]).then((val)=>{
this.storage.set('title',this.data.response.split('-')[1]).then((val)=>{
this.storage.set('bgurl',this.data.response.split('-')[2]).then((val)=>{
this.storage.set('firstcolor',this.data.response.split('-')[3]).then((val)=>{
this.storage.set('typeinv',this.data.response.split('-')[4]).then((val)=>{

    
  this.openHome();

     
});
   });
   });
     });     
  });   


 }, error => {
 console.log("Oooops!");
 });


 }

     

}
