//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//CUSTOM material module
//renamed to mod to avoid clash 
//with app.module when running ng g
import { AppMateralModule } from './material.mod'; 

//local app
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CombineComponent } from './combine/combine.component';
import { MiddlewareComponent } from './middleware/middleware.component';
import { AjaxComponent } from './ajax/ajax.component';


//-----------------------------------
//ROUTES
//-----------------------------------
const routes:Routes=[{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},{
  path:'home',
  component: HomeComponent
},{
  path:'combine',
  component: CombineComponent
},{
  path:'mddleware',
  component: MiddlewareComponent
},{
  path:'ajax',
  component: AjaxComponent
}]


@NgModule({
  declarations: [
    AppComponent,HomeComponent, CombineComponent, MiddlewareComponent, AjaxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMateralModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
