//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//CUSTOM material module
import { AppMateralModule } from './material.module'; 

//local app
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


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
}]


@NgModule({
  declarations: [
    AppComponent,HomeComponent
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
