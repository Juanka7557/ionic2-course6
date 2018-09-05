import { Component } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShopListServiceProvider} from "../../providers/shop-list-service/shop-list-service";
import {Ingredient} from "../../models/ingredient";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AuthProvider} from "../../providers/auth/auth";
import {AlertCtrlComponent} from "../../components/alert-ctrl/alert-ctrl";

/**
 * Generated class for the ShopListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-list',
  templateUrl: 'shop-list.html',
})
export class ShopListPage {
  items: Ingredient[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shopListProvider: ShopListServiceProvider,
              private popoverCtrl: PopoverController,
              private authService: AuthProvider,
              private loadingCtrl:LoadingController,
              private alertCtrl: AlertCtrlComponent) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  public onAddItem(form: NgForm): void{
    this.shopListProvider.addItem(form.value.ingrediantName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  private loadItems():void{
    this.items= this.shopListProvider.getItems();
  }

  onCheckItem(index: number){
    this.shopListProvider.removeItemByIndex(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent){

    let popover = this.popoverCtrl.create(DatabaseOptionsPage);

    const loading = this.loadingCtrl.create({
      content:'Please wait...'
    })
    popover.present({ev:event});
    popover.onDidDismiss(data=>{
      if(!data){
        return ;
      }
      if(data.action == 'load'){
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then((token:string)=>{
            console.log(token);
            this.shopListProvider.fetchList(token).subscribe(
              (list: Ingredient[])=> {
                loading.dismiss();
                if(list) {
                  this.items = list;
                  this.shopListProvider.addItems(list);
                }else {
                  this.items = [];
                }
                console.log('Success!');
              },error =>{
                 loading.dismiss();
                  this.alertCtrl.handleError(error.error.error);
                  }
              )
              });

      }else if(data.action =='store'){
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then((token:string)=>{
            console.log(token);
            this.shopListProvider.storeList(token).subscribe(
              ()=> {
                console.log('Success!');
                loading.dismiss();
              },
              error =>{
                loading.dismiss();
                this.alertCtrl.handleError(error.error.error);
              }
            )
          });
      }
    })
  }

}
