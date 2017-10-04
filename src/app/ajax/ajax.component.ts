import { Component, OnInit } from '@angular/core';

import { AjaxStore } from './ajax.store';

@Component({
  selector: 'app-ajax',
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.scss'],
  providers:[ AjaxStore ]
})
export class AjaxComponent implements OnInit {
  title="AJAX requests (async) with redix";
  explanation=`
    In this example we combine redux and async
    calls. Redux has some middleware for this.
    BUT we want to try to do it using RxJS.
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

  constructor(private store: AjaxStore ) { }

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

  fetchData(){
    console.log("fetch data");
    this.store.dispatch({
      type:"GET_USERS_START"
    });
  }

}
