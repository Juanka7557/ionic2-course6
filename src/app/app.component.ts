import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {SinginPage} from "../pages/singin/singin";
import {SingupPage} from "../pages/singup/singup";
import  firebase from "firebase";
import {AuthProvider} from "../providers/auth/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  signinPage= SinginPage;
  signupPage= SingupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private authService: AuthProvider) {
    firebase.initializeApp({
      apiKey: "AIzaSyDzXFaZJgEZ8_j-KqfZKGDhGF0dXluccS0",
      authDomain: "ionic2-recipebook-b7325.firebaseapp.com",
      databaseURL: "https://ionic2-recipebook-b7325.firebaseio.com",
      projectId: "ionic2-recipebook-b7325",
      storageBucket: "ionic2-recipebook-b7325.appspot.com",
      messagingSenderId: "742199938052"
    });
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.isAuthenticated=true;
        this.rootPage=TabsPage;
      }else{
        this.isAuthenticated=false;
        this.rootPage=SinginPage;
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SinginPage);
  }
}
