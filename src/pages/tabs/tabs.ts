import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PrincipalPage } from '../principal/principal'
import { ProfilePage } from '../profile/profile'

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  
  PrincipalPage = PrincipalPage;
  ProfilePage = ProfilePage;
  
}
