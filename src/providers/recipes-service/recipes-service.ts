import { Injectable } from '@angular/core';
import {Recipe} from "../../models/recipe";
import {Ingredient} from "../../models/ingredient";
import {DatabaseProvider} from "../database/database";

/*
  Generated class for the RecipesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipesProvider {

  private recipes: Recipe[]=[];
  databaseEntity: string = 'recipes';

  constructor(private databaseProvider: DatabaseProvider) {
  }

  addRecipes(recipes: Recipe[]){
    this.recipes.push(...recipes);
  }
  addRecipe(
    title: string,
    description:string,
    difficulty: string,
    ingredients: Ingredient[]){
    console.log('to here');
    const t = new Recipe(title,description,difficulty,ingredients);
    console.log(t);
    this.recipes.push(t);
  }

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  updateRecipe(index: number,
               title: string,
               description:string,
               difficulty: string,
               ingredients: Ingredient[]
               ){
    this.recipes[index] = new Recipe(title,description,difficulty,ingredients);
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
  }

  storeList(token: string){
    return this.databaseProvider.store(
      token,
      this.databaseEntity,
      this.recipes);
  }

  fetchList(token: string){
    this.recipes=[];
    return this.databaseProvider.fetch(token,this.databaseEntity);
  }

}
