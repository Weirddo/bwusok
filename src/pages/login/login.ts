
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ChooseventPage } from '../choosevent/choosevent';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
data:any= {};

 refutilid:string=null;

//prenom:string;
//nom:string;

constructor(public navCtrl: NavController, public http: Http,public storage: Storage) {

this.data.email ='';
this.data.pwd ='';
this.data.response='';
this.http=http;
     
  }


  submit(){
     // this.setData();
    //  this.getData();
      //Lien vers REST LOGIN API
 var link = 'http://93.115.97.208/bwus/login.php';
      //Lien vers REST LOGIN API
 var myData = JSON.stringify({email: this.data.email,pwd: this.data.pwd});

 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
  //alert(this.data.response);

if( this.data.response!="non" &&  this.data.response !="Vous n'avez pas renseigné les champs!" &&  this.data.response !='' && this.data.response.substr(0, 8)!='multiple' && this.data.response!='0'){
this.storage.set('wedprenom',this.data.response.split('-')[0]).then((val)=>{
this.storage.set('wednom',this.data.response.split('-')[1]).then((val)=>{
this.storage.set('refutilid',this.data.response.split('-')[2]).then((val)=>{
this.storage.set('email',this.data.response.split('-')[3]).then((val)=>{
this.storage.set('typeinv',this.data.response.split('-')[4]).then((val)=>{
this.storage.set('bgurl',this.data.response.split('-')[5]).then((val)=>{
this.storage.set('refevent',this.data.response.split('-')[6]).then((val)=>{   
this.storage.set('title',this.data.response.split('-')[7]).then((val)=>{  

    
  this.openHome();


         //this.openChoosEvent();
     
});
   });
   });
     });     
  });   
});
 });  
    });
 }
     
      else if (this.data.response=="0"){
alert("Vous n'êtes lié à aucun évènement, vous allez être rediriger vers la page permettant d'en créer un !");
window.location.href='http://93.115.97.208/bwus/admin2/';

     }
     
     else if (this.data.response.substr(0, 8)=="multiple"){
         this.storage.set('refutilid',this.data.response.split('-')[1]).then((val)=>{
       this.openChoosEvent();
     });
        // alert (this.data.response.split('-')[0]);
     }
     else{
         
          //alert("Vous n'êtes pas enregistré en tant qu'invité");
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

testStorage(){
    this.storage.get('weduid').then(data=>{
        if (this.data.response!=null && this.data.response!=''){
             //alert(this.data.response);
            this.openHome();
        }
    })
}

    ionViewWillEnter(){
        this.testStorage();
      }



     openHome(): void {
        this.navCtrl.push(TabsPage);
    }
    
         openRegister(): void {
        this.navCtrl.push(RegisterPage);
    }
 openChoosEvent(): void {
        this.navCtrl.push(ChooseventPage);
    }
}
