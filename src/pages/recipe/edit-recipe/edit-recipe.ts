import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesProvider} from "../../../providers/recipes-service/recipes-service";
import {Recipe} from "../../../models/recipe";
import {Ingredient} from "../../../models/ingredient";

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  pageMode:'';
  selectedOptions = ['Hard', 'Easy', 'Medium'];
  recipeForm: FormGroup;
  index:number;
  recipe:Recipe;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  ngOnInit(): void {
    this.pageMode= this.navParams.get('pageMode');

    if(<string>this.pageMode == 'Edit'){
      this.index=this.navParams.get('index');
      this.recipe=this.navParams.get('recipe');
    }
    this.initializeForm();
  }

  onSubmit(){
    const value = this.recipeForm.value;
    let ingredients= [];
    if(value.ingredients.length>0){
      ingredients = value.ingredients.map(name=>{
        return {name: name, amount:1};
      });
    }
    if(<string> this.pageMode=='Edit'){
      this.recipesService.updateRecipe(
        this.index,
        value.title,
        value.description,
        value.difficulty,
        ingredients);
    }else{
      this.recipesService.addRecipe(
        value.title,
        value.description,
        value.difficulty,
        ingredients);
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private initializeForm(){
    let title =null;
    let description= null;
    let difficulty = 'Medium';
    let ingredients=[];

    if( <string>this.pageMode=='Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      this.recipe.ingredients.forEach((item:Ingredient)=>{
        ingredients.push(new FormControl(item.name, Validators.required));
      })
    }
    this.recipeForm = new FormGroup(
      {'title':new FormControl(title, Validators.required),
        'description': new FormControl(description, Validators.required),
        'difficulty': new FormControl(difficulty,Validators.required),
        'ingredients': new FormArray(ingredients)
      }
    );
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetCtrl.create({
      title:'What do you want to do?',
      buttons:[
        {
          text:'Add Ingredient',
          handler: ()=>{
            this.createNewIngredientAlert().present();
          }
        },
        {
          text:'Remove all Ingredients',
          role:'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;

            if(len>0){
              for(let i = len-1; i>=0; i--){
                fArray.removeAt(i);
              }
            }

            this.loadToast('All items deleted' ,1000);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]

    });
    actionSheet.present();
  }

  private createNewIngredientAlert(){
    const newIngredientalert=this.alertCtrl.create({
      title:'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name == null || data.name.isEmpty){
              this.loadToast('Please enter a valid value!' , 1000);
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required))
            this.loadToast('Item added' , 1000);
          }
        }
      ]
    });
    return newIngredientalert;
  }

  loadToast(message: string, duration: number){
    const toast = this.toastCtrl.create({
      message:message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }
}
