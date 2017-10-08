//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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
import { YoutubeComponent } from './youtube/youtube.component';


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
  path:'middleware',
  component: MiddlewareComponent
},{
  path:'ajax',
  component: AjaxComponent
},{
  path:'youtube',
  component: YoutubeComponent
}]


@NgModule({
  declarations: [
    AppComponent,HomeComponent, CombineComponent, 
    MiddlewareComponent, AjaxComponent, YoutubeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMateralModule,HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
