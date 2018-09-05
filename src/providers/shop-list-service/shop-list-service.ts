import { Injectable } from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {DatabaseProvider} from "../database/database";

@Injectable()
export class ShopListServiceProvider {
  ingrediants: Ingredient[]= [];
  databaseEntity: string = 'item-list';
  constructor(
              private databaseProvider: DatabaseProvider) {

  }

  addItems(items: Ingredient[]){
    this.ingrediants.push(...items);
  }

  addItem(name: string , amount: number){
    this.ingrediants.push(new Ingredient(name, amount));
    console.log(this.ingrediants);
  }

  removeItem(ingrediant: Ingredient){
    const position = this.ingrediants.findIndex((ingrediantTemp: Ingredient)=> {
      return ingrediantTemp.name==ingrediant.name;
    })
    this.removeItemByIndex(position);
  }

  removeItemByIndex(index: number){
    console.log(index);
    this.ingrediants.splice(index,1);
    console.log(this.ingrediants);
  }

  getItems(){
    return this.ingrediants.slice();
  }

  storeList(token: string){
    return this.databaseProvider.store(
      token,
      this.databaseEntity,
      this.ingrediants);
  }

  fetchList(token: string){
    this.ingrediants=[];
    return this.databaseProvider.fetch(token,this.databaseEntity);
  }
}
