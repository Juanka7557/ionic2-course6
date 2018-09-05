import { Component } from '@angular/core';
import {AlertController} from "ionic-angular";

/**
 * Generated class for the AlertCtrlComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'alert-ctrl',
  templateUrl: 'alert-ctrl.html'
})
export class AlertCtrlComponent {

  text: string;

  constructor( private alertCtrl: AlertController) {
  }

  public handleError(errorMessage: string){
    const alert = this.alertCtrl.create({title:'An error occurred', message: errorMessage, buttons:['Ok']});
    alert.present();
  }
}
