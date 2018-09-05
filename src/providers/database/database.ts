import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthProvider} from "../auth/auth";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient,
              private authService: AuthProvider) {

  }

  store(token: string, entity:string, list:any){
    const userId=this.authService.getActiveUser().uid;
    return this.http.put('https://ionic2-recipebook-b7325.firebaseio.com/'+userId+'/'+entity+'.json?auth='+token,
      list);
  }

  fetch(token: string, entity: string){
    const userId=this.authService.getActiveUser().uid;
    return this.http.get('https://ionic2-recipebook-b7325.firebaseio.com/'+userId+'/'+entity+'.json?auth='+token);
  }
}
