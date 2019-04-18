import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LieuxPage } from '../pages/lieux/lieux';
//import { EventsPage } from '../pages/events/events';
import { GaleriePage } from '../pages/galerie/galerie';
import { PhotoPage } from '../pages/photo/photo';
import { FilActuPage } from '../pages/filactu/filactu';
import { ChooseventPage } from '../pages/choosevent/choosevent';
import { ChooseventPageModule } from '../pages/choosevent/choosevent.module';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ConfirmPage } from '../pages/confirm/confirm';
import { ConfirmPageModule } from '../pages/confirm/confirm.module';
//import { ListPage } from '../pages/list/list';
import { GoldenbookPage } from '../pages/goldenbook/goldenbook';
import { GoldenbookPageModule } from '../pages/goldenbook/goldenbook.module';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule} from '@angular/http';
import { PostService } from '../services/PostService';
import { MessageService } from '../services/MessageService';
import { EventsService } from '../services/EventsService';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import {ImagePicker} from '@ionic-native/image-picker';
import { IonicStorageModule } from '@ionic/storage';
import { RegisterPage } from '../pages/register/register';
import { RegisterPageModule } from '../pages/register/register.module';




@NgModule({
  declarations: [
    MyApp,
    LieuxPage,
    GaleriePage,
    PhotoPage,
    FilActuPage,
      //ChooseventPage,
      //EventsPage,
    HomePage,
    TabsPage,
    //ConfirmPage,
    //ListPage,
    //GoldenbookPage,
     // LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
      IonicStorageModule.forRoot(),
GoldenbookPageModule,
ConfirmPageModule,
ChooseventPageModule,
LoginPageModule,
  RegisterPageModule ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LieuxPage,
    GaleriePage,
    PhotoPage,
    FilActuPage,
      ChooseventPage,
    HomePage,
    TabsPage,
    ConfirmPage,
    //ListPage,
    GoldenbookPage,
     RegisterPage,
      LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    LaunchNavigator,
    PostService,
      MessageService,
      EventsService,
      ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule {}
