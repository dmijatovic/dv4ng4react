import { Injectable, OnDestroy } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { applyMiddleware, createStore } from 'redux';

import { devToolsEnhancer } from 'redux-devtools-extension';


//-----------------------------------
// MIDDLEWARE 
//-----------------------------------
//this middleware checks
//if likes < dislikes
function checker (store) {
    return next => action => {
        //here you code on intercepted 
        //store and action data
        console.log("MIDDLEWARE action fired", action);      
        //let's do some funny check here in the middleware 
        //to demo use
        //debugger 
        if (action.type=="DISLIKE"){
            let cnt = store.getState();
            //let see if dislikes are going 
            //to be greater than likes after 
            //the action -> we will take
            if (cnt.likes < cnt.dislikes + action.payload){                
                let resp = confirm(`
                Please confirm that you want to INCREASE
                number of DISLIKES. The number of DISLIKES 
                will be then greater than number of LIKES.
                LIKES ${cnt.likes}  <  DISLIKES ${cnt.dislikes + action.payload}.
                `);
                if (resp==true){
                    //JUST PROCEED
                } else{
                    //ABORT INCERESE 
                    //BY CHANGIN tyoe
                    action.type="ABORT!";
                }
                //console.log("Are you SURE?!?")
            }
        }  
        //call next action
        //if next is not called the process STOPS
        return next(action);
    }
}

//this middleware catches the error 
//from there some additional action 
//could be taken
const error = (store) => (next) => (action) =>{
    try{
        return next(action);
    }catch(e){
        console.log("Error catched in MIDDLEWARE", e);
    }
}

const middlewares = applyMiddleware( checker, error);


//import { Observable } from 'rxjs/Observable';

//this is initial store object
const countStore={
    likes:<number>5,
    dislikes:<number>5
}

const userStore={
    firstName:<string>'',
    lastName:<string>'',
    age:<number>null
}

interface Action{
    type:string;
    payload?:{}
}

@Injectable()
export class MiddlewareStore implements OnDestroy{
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

    constructor(){
        //debugger
        //crate redux store providing reducer function and intial values
        //, devToolsEnhancer({preloadedState:countStore}) - DOES NOT WORK
        this.reduxStore = createStore(this.countReducer, countStore, middlewares );
        //log
        console.log("Redux MiddlewareStore started");
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
    countReducer(state, action){
        //log what is comming to reducer
        console.group("Reducer called");
        console.log("Action:", action);
        console.log("Data:", state);
        console.groupEnd();
        //debugger
        //decide on action
        switch(action.type.toUpperCase()){
            case "LIKE":
                //debugger
                return {...state, likes: state.likes + action.payload};
            case "DISLIKE":
                //debugger       
                return {...state, dislikes: state.dislikes + action.payload};
            default:
                //return unchanged state
                return state;
        }

    }

    ngOnDestroy(){
        console.log("Store distroyed");
    }
}
