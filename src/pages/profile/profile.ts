import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  fotoPerfil: boolean = false;

  facebook = {
    nome: '',
    fotoUrl: '',
    email: '',
    telefone: ''
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public fire: AngularFireAuth,
              public toastCtrl: ToastController) {

                this.email = fire.auth.currentUser.email;
          
                this.facebook.nome = fire.auth.currentUser.displayName;
                this.facebook.fotoUrl = fire.auth.currentUser.photoURL;
                this.facebook.email = fire.auth.currentUser.email;
                this.facebook.telefone = fire.auth.currentUser.phoneNumber;
          
                if(this.facebook.fotoUrl == null){
                  this.fotoPerfil = false;
                }else{
                  this.fotoPerfil = true;
                }
  }

  logout(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signOut();
    toast.setMessage('Desconectado!');
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

}
