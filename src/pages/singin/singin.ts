import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the SinginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singin',
  templateUrl: 'singin.html',
})
export class SinginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthProvider,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinginPage');
  }

  onSignin(form: NgForm){
    const loading= this.loadingCtrl.create({
      content: ' Singing you in ...'
    });
    loading.present();
    this.authService.singin(form.value.email, form.value.password)
      .then( data=>{
      console.log(data);
        loading.dismissAll();
      })
      .catch(error => {
      console.log(error);
        loading.dismissAll();
        const errorAlert = this.alertCtrl.create({
          title:'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        })
        errorAlert.present();
    });
  }
}
