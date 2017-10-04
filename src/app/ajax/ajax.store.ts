import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';


import { createStore, applyMiddleware } from 'redux';

import 'rxjs/add/operator/map';
//--------------------------------
//DEFINE MIDDLEWARE 
//--------------------------------

function fetchData (store) {
    return next => action => {
        //here we intercept action 
        /* data request can be 
        performed from here but I am 
        experimenting with some other 
        approaches too, see ajax.svc.ts
        if (action.type=="GET_USERS_START"){
            console.log("MIDDLEWARE cathed request for data");
            //simulate request
            fetch("https://jsonplaceholder.typicode.com/users")
            .then((res)=>{
                //debugger 
                res.json()
                .then(function(data){
                    store.dispatch({
                        type:"GET_USERS_END",
                        payload:data
                    })
                });                
            },(e)=>{
                store.dispatch({
                    type:"GET_USERS_ERROR",
                    payload:e
                })
            });
        }*/        
        //call next action
        //if next is not called the process STOPS
        return next(action);
    }
}

let middleware = applyMiddleware(fetchData);


//import { Observable } from 'rxjs/Observable';

const userStore={
    loader:false,
    error:false,
    errMsg:null,
    users:[]
}

interface Action{
    type:string;
    payload?:{}
}

@Injectable()
export class AjaxStore implements OnDestroy{
    //here we store redux store
    /* redux store has following methods
        getState()
        dispatch(action:{
            type:string,
            payload:any
        })
        subscribe()
        replaceReducer(nextReducer:function(){

        })
    */
    reduxStore:any;

    url:string="https://jsonplaceholder.typicode.com/users";

    constructor(
        private http:Http
    ){
        //debugger
        //crate redux store providing reducer function and intial values
        //, devToolsEnhancer({preloadedState:countStore}) - DOES NOT WORK
        this.reduxStore = createStore(this.userReducer, userStore, middleware );
        //log
        console.log("Redux AjaxStore started");
    }
    //this function just passes 
    //action to redux store
    //it call be also directly
    //called outside class using reduxStore
    dispatch(action:Action){
        this.reduxStore.dispatch(action);
    }
    //this function simply returns
    //data (last version of it!!!) 
    //from reduxStore
    getState(){
        return this.reduxStore.getState();
    }
    //this is REDUCER that does 
    //all changes to the store
    //the changes are detected 
    //using action type prop
    //in addition state (last version of data)
    //is passed. 
    userReducer(state, action){
        //log what is comming to reducer
        console.group("Reducer called");
        console.log("Action:", action);
        console.log("Data:", state);
        console.groupEnd();
        //debugger
        //decide on action
        switch(action.type.toUpperCase()){
            case "GET_USERS_START":
                //debugger
                return {...state, loader: true};
            case "GET_USERS_END":
                //debugger       
                return {...state, 
                    loader:false, 
                    error:false, 
                    users: action.payload
                };

            case "GET_USERS_ERROR":
                //debugger       
                return {...state, 
                    loader:false,
                    error:true,
                    errMsg: action.payload,
                    users:[]
                };
            default:
                //return unchanged state
                return state;
        }

    }

    fetchUsers(){
        this.http.get(this.url)
            .subscribe((res)=>{
                let d = res.json();
                //dispatch new action
                this.dispatch({
                    type:"GET_USERS_END",
                    payload: d
                })
            },(e)=>{
                //dispatch new action
                this.dispatch({
                    type:"GET_USERS_ERROR",
                    payload: e.message
                })
            });
    }

    ngOnDestroy(){
        console.log("Store distroyed");
    }
}
