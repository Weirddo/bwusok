import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import { EventsService } from '../../services/EventsService';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
    
posts: Array<any>;
refutil:string=null;
   refevent:string=null;
type_inv:string=null;
data:any= {};
    
  constructor(public navCtrl: NavController, private eventsService: EventsService,public storage: Storage,public http: Http) {
      
      
 /*     storage.get('weduid').then((storewedduid)=>{
     
            this.ref_util =storewedduid;  
            //alert(this.ref_utilisateur);
});*/
/*this.data.eventid ='';
  this.eventsService.getEvents(). subscribe(
        data => {
            this.events = data.results; 
            console.log(data);
        },
        err => {
            console.log("ERR"+err);
        },
        () => console.log('Post Search Complete')
    );*/
 }
      
      
      ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
    
    
    
      submit(){/*
     // this.setData();
    //  this.getData();
      //Lien vers REST LOGIN API
 var link = 'http://93.115.97.208/bwus/loginEvent.php';
      //Lien vers REST LOGIN API
 var myData = JSON.stringify({eventid: this.eventid});
 
 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
  //alert(this.data.response);

  if( this.data.response!="non" &&  this.data.response !="Vous n'avez pas renseigné les champs!" &&  this.data.response !=''){
       this.storage.set('event',this.data.response.split('-')[0]).then((val)=>{
  this.storage.set('eventtitle',this.data.response.split('-')[1]).then((val)=>{
this.storage.set('eventbgurl',this.data.response.split('-')[2]).then((val)=>{
this.storage.set('eventrefutil',this.data.response.split('-')[3]).then((val)=>{ 
this.openHome();
    
});
      });
});
});
}
     else{
          alert("Vous n'êtes pas enregistré en tant qu'invité"+myData);  
     }

    

     
   

 
 }, error => {
 console.log("Oooops!");
 });*/
      
      /*
this.storage.get('prenom').then((datatest)=>{
            alert(datatest);    }); 
            */
    
 }
    
      
     openHome(): void {
        this.navCtrl.push(EventsPage);
    }
      
  }

  


