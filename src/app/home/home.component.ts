import { Component, OnInit } from '@angular/core';

import { MdToolbar, MdToolbarRow, MdIcon } from '@angular/material';

//REDUX store is injected here directly
//and handles only events on this page
import { HomeStore } from './home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[ HomeStore ]
})
export class HomeComponent implements OnInit {
  title="Simple ng4 redux store";
  explanation=`
    In this example we use one simple 
    redux store to count likes and dislikes.
    Click on like or dislike and count will be 
    increased. All store code is in home.store.ts
    <br/><br>
    Examine console logs for store communication
    when events are fired. Store service injects
    reduxStore and is very simple wrapper arount it.
    In fact, redux store functions can be called
    directly using reduxStore prop in the service.
  `
  likeCnt:number;
  dislikeCnt:number;
  constructor(
    private store:HomeStore
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
  /*
  increaseCnt(){
    //dispatch action to redux store
    //Note! directly to redux store
    /*this.store.reduxStore.dispatch({
      type:"INCREASE",
      payload:1
    });*//*
    //via service using strong type for action
    this.store.dispatch({
      type:"TEST",
      payload:1//increase with one
    });
  }*/
}
