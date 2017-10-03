//angualar
import { Injectable, OnDestroy } from '@angular/core';
//redux
import { createStore, combineReducers } from 'redux';

//this is initial post object
const post={
    title:<string>null,
    body:<string>null,
    likes:<number>0,
    dislikes:<number>0
}
//collection of posts
const postsStore=[]
//initial user object
const userStore={
    firstName:<string>'',
    lastName:<string>'',
    age:<number>null
}
//action definition (interface)
interface Action{
    type:string;
    payload?:{}
}

@Injectable()
export class CombineStore implements OnDestroy{
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
    reducers:any;
    reduxStore:any;

    constructor(){
        //debugger
        //combine reducers 
        this.reducers = combineReducers({
            user: this.userReducer,
            posts: this.postsReducer
        })
        //crate redux store providing reducer function and intial values
        this.reduxStore = createStore(this.reducers);
        //log
        console.log("Redux CombineStore started");
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
    likesReducer(state, action){
        //log what is comming to reducer
        console.group("LIKES reducer called");
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
    //this reducer handles posts
    //default value via postsStore object
    postsReducer(data=postsStore,action){
        //log what is comming to reducer
        console.group("POSTS reducer called");
        console.log("Action:", action);
        console.log("Data:", data);
        console.groupEnd();

        switch(action.type){
            case "CREATE":
                //here we create addional item
                //in the array using SPREAD operator
                return [...data,action.payload];
            case "UPDATE":
                //here we are going to update/replace 
                //specific item with new item data, 
                //to do this we need the item id 
                //and item data in the payload
                //debugger
                //let before = [...data.slice(0,action.payload.index)]
                let newData=[
                    ...data.slice(0,action.payload.index),//take data before item
                    action.payload.data, //add new data item
                    ...data.slice(action.payload.index + 1) //take items after one to update
                ]
                return newData; 
            case "DELETE":
                //here we take specific item out of array
                //using slice (note splice is mutable!)
                //and SPREAD operator (contact also possible)
                //paylod in this case is just atrray index
                return [
                    ...data.slice(0,action.payload),//before item to remove
                    ...data.slice(action.payload + 1)//after item to remove
                ]
            default:
                //if not for use just return unchanged
                return data;
        }

    }
    //this reducers handle user properties
    //default value is provided via userStore
    userReducer(data=userStore,action){
        //log what is comming to reducer
        console.group("USER reducer called");
        console.log("Action:", action);
        console.log("Data:", data);
        console.groupEnd();

        switch(action.type){
            case "FIRSTNAME":
                return{...data,firstName:action.payload};
            case "LASTNAME":
                return{...data,lastName:action.payload};
            case "AGE":
                return{...data,age:action.payload};
            default:
                //if not for use just return unchanged
                return data;
        }
    }
    ngOnDestroy(){
        console.log("Store distroyed");
    }
}
