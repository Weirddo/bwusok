import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ChooseventPage } from '../choosevent/choosevent';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
data:any= {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
     this.data.firstname ='';
      this.data.lastname ='';
      this.data.type_inv ='I';
      this.data.email ='';
this.data.pwd ='';
this.data.response='';
this.data.check ;
this.http=http;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
    
    
      submit(){
      if(this.data.check===true){
     // this.setData();
    //  this.getData();
      //Lien vers REST LOGIN API



          
 var link = 'http://93.115.97.208/bwus/register.php';
      //Lien vers REST LOGIN API
 var myData = JSON.stringify({lastname: this.data.lastname,firstname: this.data.firstname,email: this.data.email,pwd: this.data.pwd,type_inv:this.data.type_inv});

 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
if( this.data.response!="non" &&  this.data.response !="Vous n'avez pas renseigné les champs!" &&  this.data.response !=''){
      this.openLogin();
 }

     else{
         
          alert("L'enregistrement a rencontré un problème");
         //alert(this.data.response);
     }







 }, error => {
 console.log("Oooops!");
 });

      /*
this.storage.get('prenom').then((datatest)=>{
            alert(datatest);    });
            */
}
else{
alert("Vous devez valider les conditions d'utilisation");
}
 }
    
    openLogin(): void {
        this.navCtrl.push(LoginPage);
    }

}
