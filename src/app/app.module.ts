import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {ShopListPage} from "../pages/shop-list/shop-list";
import {RecipePage} from "../pages/recipe/recipe";
import {TabsPage} from "../pages/tabs/tabs";
import {EditRecipePage} from "../pages/recipe/edit-recipe/edit-recipe";
import {RecipesPage} from "../pages/recipes/recipes";
import { ShopListServiceProvider } from '../providers/shop-list-service/shop-list-service';
import { RecipesProvider } from '../providers/recipes-service/recipes-service';
import {SingupPage} from "../pages/singup/singup";
import {SinginPage} from "../pages/singin/singin";
import { AuthProvider } from '../providers/auth/auth';
import {DatabaseOptionsPage} from "../pages/database-options/database-options";
import {HttpClientModule} from '@angular/common/http';
import {AlertCtrlComponent} from "../components/alert-ctrl/alert-ctrl";
import { DatabaseProvider } from '../providers/database/database';


@NgModule({
  declarations: [
    MyApp,
    ShopListPage,
    RecipePage,
    EditRecipePage,
    TabsPage,
    RecipesPage,
    SingupPage,
    SinginPage,
    DatabaseOptionsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShopListPage,
    RecipePage,
    EditRecipePage,
    TabsPage,
    RecipesPage,
    SingupPage,
    SinginPage,
    DatabaseOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShopListServiceProvider,
    RecipesProvider,
    AuthProvider,
    AlertCtrlComponent,
    DatabaseProvider
  ]
})
export class AppModule {}
