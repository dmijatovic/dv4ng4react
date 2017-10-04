import { Component, OnInit } from '@angular/core';

import { MiddlewareStore  } from './middleware.store';

@Component({
  selector: 'app-middleware',
  templateUrl: './middleware.component.html',
  styleUrls: ['../home/home.component.scss'],
  providers:[ MiddlewareStore ]
})
export class MiddlewareComponent implements OnInit {
  title="Redux store middleware";
  explanation=`
    In this example we use MIDDLEWARE in our simple 
    redux store. We intercept all actions using the middleware 
    and we perform additional checks/actions before action is 
    allowed. This is usefull for validation purposes, 
    checking errors during the process, or to handle side-effects, 
    like http request. 
    <br/><br>
    All store code is in "middleware.store.ts".     
    Examine console logs for store communication
    about fired events. Store service injects the 
    reduxStore and is very simple wrapper arount it.
    In fact, redux store functions can be called
    directly using reduxStore in the service.
  `
  likeCnt:number;
  dislikeCnt:number;
  constructor(
    private store:MiddlewareStore
  ) { }

  ngOnInit() {
    //subscribe 
    this.store.reduxStore.subscribe(()=>{
      //get new store state
      let store = this.store.reduxStore.getState();
      this.updateCounters(store);
      //console.log("from redux subscribe", store);
    });
    //get inital values
    this.store.dispatch({
      type:"INIT"
    });
  }
  updateCounters(data){
    this.likeCnt = data.likes;
    this.dislikeCnt = data.dislikes
  }
  //here we increse likes
  countLike(){
    console.log("Count likes");
    this.store.dispatch({
      type:"LIKE",
      payload:1//increase with one
    })
  } 
  countDislike(){
    console.log("Count dislikes");
    this.store.dispatch({
      type:"DISLIKE",
      payload:1//increase by 1
    })
  }

}
