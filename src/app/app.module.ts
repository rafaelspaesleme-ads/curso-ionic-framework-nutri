import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';
import { RegistroPage } from '../pages/registro/registro';
import { RecuperarPage } from '../pages/recuperar/recuperar';
import { ProfilePage } from '../pages/profile/profile';
import { PostPage } from '../pages/post/post';
import { TabsPage } from '../pages/tabs/tabs';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { from } from 'rxjs/observable/from';

import { WordpressService } from '../service/wordpress.service';
import { HttpModule } from '@angular/http';


const firebaseAuth = {
  apiKey: "----------------------------------------------",
  authDomain: "------------------------------------------",
  databaseURL: "-----------------------------------------",
  projectId: "-----------------",
  storageBucket: "-----------------------------",
  messagingSenderId: "---------------"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrincipalPage,
    RegistroPage,
    RecuperarPage,
    ProfilePage,
    PostPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrincipalPage,
    RegistroPage,
    RecuperarPage,
    ProfilePage,
    PostPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WordpressService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
