import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';
import {AngularFireAuth} from 'angularfire2/auth';
import {Users} from './users';
import { RecuperarPage } from '../recuperar/recuperar';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  users: Users = new Users();
  
  @ViewChild('usuario') user;
  @ViewChild('senha') password;
  

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public fire: AngularFireAuth) {

                this.tabBarElement = document.querySelector('.show-tabbar');

  }

  ngAfterViewInit(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if(tabs !== null){
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  ionViewWillLeave(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if(tabs !== null){
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }
  

  entrar(){

    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
 
    this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('Data: ', data);
      this.users.email = this.user.value;
      this.users.senha = this.password.value;
      toast.setMessage('Conectado!');
      toast.present();
      this.navCtrl.setRoot(TabsPage);

      //caso de sucesso
    })
    .catch((error: any) => {

      if(error.code == 'auth/expired-action-code'){
        toast.setMessage('O código de ação expirou.')
      }else if(error.code == 'auth/invalid-action-code'){
        toast.setMessage('O código de ação é inválido. Isso pode acontecer se o código estiver mal formado ou já tiver sido usado.');
      }else if(error.code == 'auth/user-disabled'){
        toast.setMessage('O usuário correspondente ao código de ação fornecido foi desativado.');
      }else if(error.code == 'auth/user-not-found'){
        toast.setMessage('Não há usuário correspondente ao código de ação. Isso pode ter acontecido se o usuário foi excluído entre quando o código de ação foi emitido e quando esse método foi chamado.');
      } else {
        toast.setMessage('Erro inesperado!');
      }
      toast.present();

      //caso de erro
    });

  }

  cadastrar(){
    this.navCtrl.push(RegistroPage);

  }

  recuperar(){
    this.navCtrl.push(RecuperarPage);
  }

  loginWithFacebook(){
    this.fire.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider())
    .then(res => {
      console.log(res);
      this.navCtrl.setRoot(TabsPage);
    })
  }

  loginVisitante(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});

    this.fire.auth.signInAnonymously()
    .then(data => {
      //sucesso
      console.log('data: ', data);

      this.navCtrl.setRoot(TabsPage);

    })
    .catch((error: any) => {

      if(error.code == 'auth/operation-not-allowed'){
        toast.setMessage('Contas anônimas não estão ativadas. Ative contas anônimas no Firebase Console, na guia Auth.');
      } else {
        toast.setMessage('Erro inesperado!');
      console.log('Error: ', error);
      }
      toast.present();

    });
  }
  

}
