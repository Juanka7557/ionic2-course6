import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, PopoverController} from 'ionic-angular';
import {EditRecipePage} from "../recipe/edit-recipe/edit-recipe";
import {RecipesProvider} from "../../providers/recipes-service/recipes-service";
import {Recipe} from "../../models/recipe";
import {RecipePage} from "../recipe/recipe";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AlertCtrlComponent} from "../../components/alert-ctrl/alert-ctrl";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage{

  recipes: Recipe[];
  constructor(public navCtrl: NavController,
              private recipesService: RecipesProvider,
              private alertCtrl: AlertCtrlComponent,
              private authService: AuthProvider,
              private loadingCtrl: LoadingController,
              private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  ionViewWillEnter(){
    this.recipes = this.recipesService.getRecipes();
  }
  newRecipe(){
    this.navCtrl.push(EditRecipePage,{pageMode:'New'});
  }

  onLoadRecipe(recipe: Recipe, index:number){
    if(!recipe.hasOwnProperty('ingredients')){
      recipe.ingredients = [];
    }
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
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
            this.recipesService.fetchList(token).subscribe(
              (list: Recipe[])=> {
                loading.dismiss();
                if(list) {
                  this.recipes = list;
                  this.recipesService.addRecipes(list);
                  //this.recipesService.addItems(list);
                }else {
                  this.recipes = [];
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
            this.recipesService.storeList(token).subscribe(
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
