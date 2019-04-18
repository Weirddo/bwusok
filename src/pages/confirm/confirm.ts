import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
bgurl:string=null;
data:any= {};
ref_utilisateur:string=null;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public storage: Storage) {
      storage.get('bgurl').then((bgurl)=>{

            this.bgurl =bgurl;
            //alert(this.ref_utilisateur);
});

      storage.get('weduid').then((datatest)=>{

            this.ref_utilisateur =datatest;
            //alert(this.ref_utilisateur);
});
      this.http=http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }


        submitPresence(){
 var link = 'http://93.115.97.208/weddingrest/user/update_confs.php';
 var myData = JSON.stringify({ref_utilisateur: this.ref_utilisateur,confirmed_cerem: this.data.confirmed_cerem,confirmed_vin: this.data.confirmed_vin,confirmed_fete: this.data.confirmed_soiree,confirmed_brunch: this.data.confirmed_brunch});

 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
 this.navCtrl.parent.select(0);
 // console.log(data.response);
 }, error => {
 console.log("Oooops!");
 });

    }

updateVin(){
var toggleStatus = this.data.toggle_vin;
var classn = this.data.confirmed_vin;
    if(toggleStatus==false){
    this.data.confirmed_vin="N";
    }
    else{
        this.data.confirmed_vin="Y";
    }
    //alert(this.data.confirmed_vin);

 }


    updateCerem(){
var toggleStatus = this.data.toggle_cerem;
var classn = this.data.confirmed_cerem;
    if(toggleStatus==false){
    this.data.confirmed_cerem="N";
    }
    else{
        this.data.confirmed_cerem="Y";
    }
   // alert(this.data.confirmed_cerem);

 }

    updateFete(){
var toggleStatus = this.data.toggle_soiree;
var classn = this.data.confirmed_soiree;
    if(toggleStatus==false){
    this.data.confirmed_soiree="N";
    }
    else{
        this.data.confirmed_soiree="Y";
    }
  //  alert(this.data.confirmed_soiree);

 }

    updateBrunch(){
var toggleStatus = this.data.toggle_brunch;
var classn = this.data.confirmed_brunch;
    if(toggleStatus==false){
    this.data.confirmed_brunch="N";
    }
    else{
        this.data.confirmed_brunch="Y";
    }
   // alert(this.data.confirmed_brunch);

 }

}
