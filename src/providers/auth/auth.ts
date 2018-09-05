import { Injectable } from '@angular/core';
import  firebase  from 'firebase';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  singup(email: string, password:string){
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }

  singin(email:string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  logout(){
    firebase.auth().signOut();
  }

  getActiveUser(){
    return firebase.auth().currentUser;
  }
}
