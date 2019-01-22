import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  tabBarElement: any;

  @ViewChild('usuario') user;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public fire: AngularFireAuth,
              public toastCtrl: ToastController) {

                this.tabBarElement = document.querySelector('.show-tabbar');

  }

  ionViewWillEnter(){
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

  registrar(){

    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('data: ', data);

      toast.setMessage('Usuário cadastrado!');
      toast.present();
      this.navCtrl.setRoot(TabsPage);

      //chamar proxima pagina
    })
    .catch((error: any) => {

      if(error.code == 'auth/email-already-in-use'){
        toast.setMessage('Já existe uma conta com o endereço de e-mail fornecido.')
      }else if(error.code == 'auth/invalid-email'){
        toast.setMessage('O endereço de e-mail não é válido.');
      }else if(error.code == 'auth/operation-not-allowed'){
        toast.setMessage('As contas de email / senha não estão ativadas. Ative as contas de e-mail / senha no Firebase Console, na guia Auth.');
      }else if(error.code == 'auth/weak-password'){
        toast.setMessage('Se a senha não for forte o suficiente.');
      } else {
        toast.setMessage('Erro inesperado!');
      }
      toast.present();

      //mensagem de erro
    });
  }

}
