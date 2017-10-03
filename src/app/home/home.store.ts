import { Injectable, OnDestroy } from '@angular/core';

import { createStore, combineReducers } from 'redux';

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
export class HomeStore implements OnDestroy{
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
        this.reduxStore = createStore(this.countReducer, countStore);
        //log
        console.log("Redux HomeStore started");
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
