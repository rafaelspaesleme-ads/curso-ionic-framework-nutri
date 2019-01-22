import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { PostPage } from '../post/post';

import { WordpressService } from '../../service/wordpress.service';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  posts: Array<any> = new Array<any>();

  morePageAvailable: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public fire: AngularFireAuth,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public wordpressService: WordpressService) {

  }

  ionViewWillEnter(){
    this.morePageAvailable = true;
    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressService.getRecentPosts()
      .subscribe(data => {
        console.log('DATA: ', data);
          for(let post of data){
            post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "<p>";

            this.posts.push(post);
          }
          loading.dismiss();
      });
    }
  }

  logout(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signOut();
    toast.setMessage('Desconectado!');
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

  postTapped(event, post){
    this.navCtrl.push(PostPage, {
      item: post
    });
  }

  doInfinite(infiniteScroll){
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;
    this.wordpressService.getRecentPosts(page)
    .subscribe(data => {

      for(let post of data){

        if(!loading){
          infiniteScroll.complete();
        }
        this.posts.push(post);
        loading = false;

      }

    }, err => {
      this.morePageAvailable = false;
    })
  }

  doRefresh(refresher){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
