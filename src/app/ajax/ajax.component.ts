import { Component, OnInit } from '@angular/core';

import { AjaxStore } from './ajax.store';
import { AjaxSvc } from './ajax.svc';

@Component({
  selector: 'app-ajax',
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.scss'],
  providers:[ AjaxStore, AjaxSvc ]
})
export class AjaxComponent implements OnInit {
  title="HTTP requests (async) with redix";
  explanation=`
    In this example we combine redux and async
    calls. Async calls could be done using middleware.
    I saw some examples with redux-thunk.
    BUT I want to try it with RxJS and angular services.
    Therefore http service (ajax.svc) is also injected 
    into this component. During the test fetching few 
    records went fairly quickly so I added few secs of 
    timeout to be able to see material spinner :-)
    <br/><br>
    Examine console logs for store communication
    when events are fired. Store service injects
    reduxStore and is very simple wrapper arount it.
    In fact, redux store functions can be called
    directly using reduxStore prop in the service.
  `
  users=[];
  loader=false;
  error=false;
  errMsg="";

  constructor(
    private store: AjaxStore,
    private dataSvc: AjaxSvc ){ }

  ngOnInit() {
    this.store.reduxStore.subscribe(()=>{
       //get store stuff
       let store = this.store.getState();
       this.updateComps(store);
    })
    this.store.dispatch({
      type:"NG-ON-INIT"
    })
  }
  updateComps(data){
     //debugger
     console.log("Update", data);

     this.loader = data.loader;
     this.error = data.error;
     this.errMsg = data.errMsg;
     this.users = data.users;
     
  } 

  getUsersStart(){
    //console.log("fetch data");
    this.store.dispatch({
      type:"GET_USERS_START"
    });
    //now lets get that data!
    this.dataSvc.getData()
      .subscribe((d)=>{
        //data received 
        //debugger
        this.getUsersEnd(d);
      },(e)=>{
        //debugger 
        this.getUsersError(e);
      });
  }
  getUsersEnd(d){
    //publish data to store
    //but let slow it a bit down :-)

    setTimeout(()=>{
      this.store.dispatch({
        type:"GET_USERS_END",
        payload: d
      });
    },2000);
    
  }
  getUsersError(e){
    //oh no there is an error :-(
    this.store.dispatch({
      type:"GET_USERS_ERROR",
      payload: "Oh NO, fetch request FAILED :-("
    });
  }
}
