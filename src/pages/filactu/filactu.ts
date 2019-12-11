import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import { PostService } from '../../services/PostService';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
declare var cordova: any;

@Component({
  selector: 'page-filactu',
  templateUrl: 'filactu.html'
})
export class FilActuPage {

   /**
    * @name items
    * @type {Array}
    * @public
    * @description     Used to store returned PHP data
    */
posts: Array<any>;
ref_utilisateur:string=null;
type_inv:string=null;
data:any= {};
refevent:string=null;
bgurl:string=null;
posturl:string=null;
    private fileTransfer: TransferObject;
  constructor(public navCtrl: NavController, private postService: PostService,public storage: Storage,public http: Http,public alertController: AlertController,private file: File,private transfer: Transfer) {

storage.get('refutilid').then((storewedduid)=>{

            this.ref_utilisateur =storewedduid;
            //alert(this.ref_utilisateur);
});
storage.get('typeinv').then((datatest)=>{

            this.type_inv =datatest;
            //alert(this.ref_utilisateur);
});

    storage.get('refevent').then((refevent)=>{

            this.refevent =refevent;
          this.submit();
});
 storage.get('bgurl').then((bgurl)=>{

            this.bgurl =bgurl;
            //alert(this.ref_utilisateur);
});

 }

 delete(id:number){
 var link = 'http://93.115.97.208/bwus/post/delete.php';
 var myData = JSON.stringify(id);
 //alert(id);
 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
 alert("Post supprimé !");
 }, error => {
 alert("Oooops!");
 });
this.navCtrl.push(FilActuPage);
    }
    
    
     report(id:number){
 var link = 'http://93.115.97.208/bwus/post/report.php';
 var myData = JSON.stringify(id);
 //alert(id);
 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
 alert("Post marqué comme abus !");
 }, error => {
 alert("Oooops!");
 });
this.navCtrl.push(FilActuPage);
    }


    ionViewDidEnter(){
  this.storage.get('refevent').then((refevent)=>{
            this.refevent =refevent;
      this.submit()
});
    }

submit(){
var link = 'http://93.115.97.208/bwus/post/read.php';
var myData = JSON.stringify({refevent: this.refevent});
   // alert (myData);
this.http.post(link, myData).subscribe(data => {
 this.posts = data.json().results;
 }, error => {
 console.log("Oooops!");
 });
    }

block(refutilid:number){
 var link = 'http://93.115.97.208/bwus/post/block.php';
    var myData = JSON.stringify({blocker_id: this.ref_utilisateur,blocked_id:refutilid});
    //alert(this.ref_utilisateur);
 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
 alert("Vous ne verrez plus les publications de ce user");
 }, error => {
 alert("OOOps");
 });
this.navCtrl.push(FilActuPage);
    }
    
    
    proposeDownload(posturl:string){
        this.posturl=posturl;
this.presentAlertConfirm(this.posturl);
}


  async presentAlertConfirm(posturl:string) {
    const alert = await this.alertController.create({
      
      message: 'Voulez-vous enregistrer cette image ?!',
      buttons: [
        {
          text: 'Annuler',
          role: 'annuler',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Enregistrer',
          handler: () => {
            //console.log('Confirm Okay');
              this.saveImage(this.posturl);
          }
        }
      ]
    });

    await alert.present();
  }

    
saveImage(posturl:string){
       this.download(this.posturl.substring(34),this.posturl);  
    /*alert (this.posturl);*/
}
    
public download(fileName, filePath) {  
  this.file.createDir(cordova.file.externalRootDirectory, 'bwus', true).then((val) => {
      //here encoding path as encodeURI() format.  
    let url = encodeURI(filePath);  
    //here initializing object.  
    this.fileTransfer = this.transfer.create();  
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    this.fileTransfer.download(url, cordova.file.externalRootDirectory+'bwus/' + fileName, true).then((entry) => {  
        //here logging our success downloaded file path in mobile.  
        //alert('photo téléchargé !: ' + entry.toURL());  
    }, (error) => {  
        //here logging our error its easier to find out what type of error occured.  
        alert("Erreur dans l'enregistrement, veuillez réessayer !: ");  
    });  
    }).catch(e => {
      //alert("error is "+e.toString());
    });
      
        }  

} 
/*
  public creDir(){
  this.file.createDir(cordova.file.externalRootDirectory, 'bwus', true).then((val) => {
      //here encoding path as encodeURI() format.  
    let url = encodeURI(filePath);  
    //here initializing object.  
    this.fileTransfer = this.transfer.create();  
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    this.fileTransfer.download(url, cordova.file.externalRootDirectory+'bwus/' + fileName, true).then((entry) => {  
        //here logging our success downloaded file path in mobile.  
        //alert('photo téléchargé !: ' + entry.toURL());  
    }, (error) => {  
        //here logging our error its easier to find out what type of error occured.  
        alert("Erreur dans l'enregistrement, veuillez réessayer !: ");  
    });  
    }).catch(e => {
      //alert("error is "+e.toString());
    });
      
        }      
}

*/


