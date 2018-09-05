import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {EditRecipePage} from "./edit-recipe/edit-recipe";
import {ShopListServiceProvider} from "../../providers/shop-list-service/shop-list-service";
import {RecipesProvider} from "../../providers/recipes-service/recipes-service";
import {RecipesPage} from "../recipes/recipes";

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  index:number;
  recipe: Recipe;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shopListService: ShopListServiceProvider,
              private recipeService: RecipesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ngOnInit(): void {
    this.recipe= this.navParams.get('recipe');
    this.index= this.navParams.get('index');
  }

  onAddIngredients(){
    this.shopListService.addItems(this.recipe.ingredients);
    this.navCtrl.popToRoot();
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage, {pageMode:'Edit', recipe:this.recipe, index: this.index})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.index);

    this.navCtrl.push(RecipesPage).then(() => {
      const startIndex = this.navCtrl.getActive().index - 2;
      this.navCtrl.remove(startIndex, 2);
    });
  }
}
