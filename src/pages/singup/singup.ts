import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the SingupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthProvider,
              private loading: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingupPage');
  }

  onSignup(form: NgForm){
    console.log(form.value);
    const loading = this.loading.create({
      content:'Singing you up...'
    });
    loading.present();
    this.authService.singup(form.value.email, form.value.password)
      .then(data => loading.dismiss())
      .catch(error => {
        loading.dismiss();
        const errorAlert= this.alertCtrl.create({
          title:'Singup faild',
          message: error.message,
          buttons: ['Ok']
        })
        errorAlert.present();
      });
  }
}
