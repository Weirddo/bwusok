import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';


@Component({
  selector: 'page-lieux',
  templateUrl: 'lieux.html'
})


export class LieuxPage {
   lieux: Array<any>;
refevent:string=null;
bgurl:string=null;
firstcolor:string=null;

  constructor(public navCtrl: NavController,private launchNavigator: LaunchNavigator,public storage: Storage,public http: Http) {

storage.get('refevent').then((refevent)=>{

            this.refevent =refevent;
            //alert(this.refevent);
          this.submit();
});

storage.get('bgurl').then((bgurl)=>{

            this.bgurl =bgurl;
            //alert(this.ref_utilisateur);
});
storage.get('firstcolor').then((firstcolor)=>{

            this.firstcolor =firstcolor;
            //alert(this.ref_utilisateur);
});
  }

      ionViewDidEnter(){
  this.storage.get('refevent').then((refevent)=>{
            this.refevent =refevent;
      this.submit()
});
    }

   submit(){
var link = 'http://93.115.97.208/bwus/lieu/read.php';
var myData = JSON.stringify({refevent: this.refevent});
this.http.post(link, myData).subscribe(data => {
 this.lieux = data.json().results;
    //alert(this.lieux);
 }, error => {
 console.log("Oooops!");
 });
    }

    navme(address){
this.launchNavigator.navigate(address);
}

}
