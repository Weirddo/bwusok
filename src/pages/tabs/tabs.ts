import { Component } from '@angular/core';

import { LieuxPage } from '../lieux/lieux';
import { GaleriePage } from '../galerie/galerie';
import { PhotoPage } from '../photo/photo';
import { FilActuPage } from '../filactu/filactu';
import { HomePage } from '../home/home';
import {Camera, CameraOptions} from '@ionic-native/camera';




@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LieuxPage;
  tab3Root = GaleriePage;
  tab4Root = PhotoPage;
  tab5Root = FilActuPage;

  
  

  
  constructor() {

  }
  

  


}
