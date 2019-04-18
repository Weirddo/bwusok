import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, AlertController, Loading } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { ImagePicker } from '@ionic-native/image-picker';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import {Http} from '@angular/http';
import { normalizeURL } from 'ionic-angular';

declare var cordova: any;


@Component({
  selector: 'page-galerie',
  templateUrl: 'galerie.html'
})



export class GaleriePage {
lastImage: string = null;
loading: Loading;

data:any= {};
picurl:string=null;
    ref_util_id:string=null;
    refevent:string=null;


  constructor(public navCtrl: NavController, private camera : Camera,
    public alertCtrl: AlertController,
    private domSanitizer: DomSanitizer, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public http: Http,storage: Storage) {
   // On ouvre  l'appareil des qu on entre dans l'activité

storage.get('refutilid').then((datatest)=>{

            this.ref_util_id = datatest;
            //alert(datatest.toString());
});
storage.get('refevent').then((refevent)=>{

            this.refevent = refevent;
            //alert(datatest.toString());
});
    }



takePicture(sourceType){


       // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
      this.navCtrl.parent.select(4);
  });
 }

  displayErrorAlert(err){
    console.log(err);
    let alert = this.alertCtrl.create({
       title: 'Error',
       subTitle: 'Error while trying to capture picture',
       buttons: ['OK']
     });
     alert.present();
  }

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // Destination URL
  var url = "http://93.115.97.208/bwus/upload.php";

  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);

  // File name only
  var filename = this.lastImage;
 this.picurl='http://93.115.97.208/bwus/uploads/'+filename;
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };

  const fileTransfer: TransferObject = this.transfer.create();

  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();

  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
    this.savePost();

  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}


public savePost(){
var link = 'http://93.115.97.208/bwus/post/create.php';
 //var url = 'http://tmoisan.eu/alvybatrest/uploads/'+this.lastImage;
    var myData = JSON.stringify({url: this.picurl,ref_util_id: this.ref_util_id,refevent:this.refevent});
 this.http.post(link, myData)
 .subscribe(data => {
 this.data.response = data["_body"];
 // console.log(data.response);

this.navCtrl.parent.select(4);
     // this.navCtrl.parent.select(5);
 }, error => {
 alert("error");
 });

}

    ionViewDidEnter(){
     this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    }
}


