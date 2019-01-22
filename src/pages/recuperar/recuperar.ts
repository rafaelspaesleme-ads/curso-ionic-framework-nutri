import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
 
/**
 * Generated class for the RecuperarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  @ViewChild('email') emailDigitado;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public fire: AngularFireAuth) {
  }
  
  recuperar(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.sendPasswordResetEmail(this.emailDigitado.value)
    .then(data => {
      console.log('data: ', data);

      toast.setMessage('Solicitação enviada com sucesso para seu email!');
      toast.present();
      this.navCtrl.pop();

      //sucesso
    })
    .catch((error: any) => {

      if(error.code == 'auth/invalid-email'){
        toast.setMessage('O endereço de e-mail não é válido.')
      }else if(error.code == 'auth/missing-android-pkg-name'){
        toast.setMessage('Um nome de pacote Android deve ser fornecido se o aplicativo Android precisar ser instalado.');
      }else if(error.code == 'auth/missing-continue-uri'){
        toast.setMessage('Um URL de continuação deve ser fornecido na solicitação.');
      }else if(error.code == 'auth/missing-ios-bundle-id'){
        toast.setMessage('Um ID do pacote do iOS deve ser fornecido se um ID da App Store for fornecido.');
      }else if(error.code == 'auth/invalid-continue-uri'){
        toast.setMessage('O URL contínuo fornecido na solicitação é inválido.');
      }else if(error.code == 'auth/unauthorized-continue-uri'){
        toast.setMessage('O domínio da URL de continuação não está na lista de autorizações. Coloque na lista de permissões o domínio no Firebase console.');
      }else if(error.code == 'auth/user-not-found'){
        toast.setMessage('Não há usuário correspondente ao endereço de e-mail.');
      } else {
        toast.setMessage('Erro inesperado!');
      }
      toast.present();

      //erro
    });
  }




}
