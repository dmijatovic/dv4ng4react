import { Injectable } from '@angular/core';

import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { devToolsEnhancer } from 'redux-devtools-extension';

//------------------------------------------------
//reducer 1 total search stats 
const infoSearch={
    totalResults:<number>null,
    regionCode:<string>null,
    nextPageToken:<string>null,
    pageInfo:<string>null,
    prevPageToken:<string>null
}
//reducer 2 for video list
const infoVideo={
    /*"videoId":{
        etag:<string>null,
        id:<string>null,        
        channelId:<string>null,
        channelTitle:<string>null,
        title:<string>null, 
        description:<string>null,
        publishedAt:<Date>null,
        defaultThumbnail:<string>null
    }*/
}
//reducer 3 for video stats
const statVideo={
    /*"videoId":{
        viewCount: <number>0,
        likeCount: <number>0,
        dislikeCount: <number>0,
        favoriteCount: <number>0,
        commentCount: <number>0
    }*/
}
//reducer 4 for ui states / filters 
const uiState={
    errMsg:<string>null,
    loader:<boolean>false,
    search:<string>null,
    maxResults:<number>6,
    publishedAfter:<Date> new Date('2017-01-01T00:00:00Z')    
}

//basic action interface def
interface Action{
    type:string;
    payload?:{}
}

@Injectable()
export class YoutubeStore{
    //here we store redux store
    /* redux store has following methods
        getdata()
        dispatch(action:{
            type:string,
            payload:any
        })
        subscribe()
        replaceReducer(nextReducer:function(){

        })
    */
    reducers:any;
    redux:any;
    constructor(){
        //------------------------------------------------
        // COMBINE REDUCERS
        //------------------------------------------------
        //debugger
        this.reducers = combineReducers({
            infoSearch:this.infoSearch,
            infoVideo:this.infoVideo,
            statVideo: this.statVideo,
            uiState:this.uiState
        });

        //-----------------------------------------------
        //crate redux store providing reducers function and intial values
        //, devToolsEnhancer({preloadeddata:countStore}) - DOES NOT WORK
        this.redux = createStore(this.reducers);
        //log
        console.log("Redux YoutubeStore started");
    }
    //this function just passes 
    //action to redux store
    //it call be also directly
    //called outside class using redux
    dispatch(action:Action){
        this.redux.dispatch(action);
    }
    //this function simply returns
    //data (last version of it!!!) 
    //from redux
    getState(){
        return this.redux.getState();
    }
    //this is REDUCER that does 
    //all changes to the store
    //the changes are detected 
    //using action type prop
    //in addition data (last version of data)
    //is passed. 
    //NOTE! the reducer is in diferent 
    //SCOPE when called from redux. 
    //YOU CANNOT USE this. to refer 
    //to functions in this class
    infoSearch(data=infoSearch, action){
        //log what is comming to reducer
        console.group("infoSearch reducer");
        console.log("Action:", action);
        console.log("Data:", data);
        console.groupEnd();
        //debugger
        //decide on action
        switch(action.type.toUpperCase()){
            case "GET_SEARCH_RESULT_START":
                //debugger
                return data 
            case "GET_SEARCH_RESULT_END":
                //debugger       
                return {
                    totalResults:action.payload.pageInfo.totalResults,
                    regionCode:action.payload.regionCode,
                    nextPageToken:action.payload.nextPageToken,
                    pageInfo:action.payload.pageInfo,
                    prevPageToken:action.payload.prevPageToken
                };
            default:
                //return unchanged data
                return data;
        }

    }

    infoVideo(data=infoVideo, action){
        //log what is comming to reducer
        console.group("infoVideo reducer");
        console.log("Action:", action);
        console.log("Data:", data);
        console.groupEnd();
        //debugger
        //decide on action
        switch(action.type.toUpperCase()){
            case "GET_SEARCH_RESULT_START":
                //debugger
                return data 
            case "GET_SEARCH_RESULT_END":
                //debugger       
                return mapRawVideoInfo(action.payload.items);
            default:
                //return unchanged data
                return data;
        }
        
        //we need videoId to be the key
        //of each video so we can 
        //link it to video stats
        function mapRawVideoInfo(data){
            //debugger
            let videos={};

            data.map((item)=>{
    
                //add each item using
                //videoId as key
                videos[item.id.videoId]={
                    etag:item.etag,
                    id:item.id.videoId,        
                    channelId:item.snippet.channelId,
                    channelTitle:item.snippet.channelTitle,
                    title:item.snippet.title, 
                    description:item.snippet.description,
                    publishedAt:item.snippet.publishedAt,
                    defaultThumbnail:item.snippet.thumbnails.default
                };
    
            });
            //return videos object
            return videos;
        }
    }

    statVideo(data=statVideo, action){
        //log what is comming to reducer
        console.group("statVideo reducer");
        console.log("Action:", action);
        console.log("Data:", data);
        console.groupEnd();
        //debugger
        //decide on action
        switch(action.type.toUpperCase()){
            case "GET_VIDEO_STATS_START":
                //debugger
                return data;
            case "GET_VIDEO_STATS_END":
                //debugger       
                return mapRawVideoStat(action.payload.items);

            case "REDUCE_MAX_RESULTS":
                //here we have already converted data in the 
                //store and we just need to reduce amout of it
                return reduceMaxResults(data, action.payload);

            default:
                //return unchanged data
                return data;
        }
        //we need videoId to be the key
        //of each video so we can 
        //link it to video stats
        function mapRawVideoStat(data){
            //debugger            
            let stats={};
            data.map((item)=>{
    
                //add each item using
                //videoId as key
                stats[item.id]={
                    viewCount: item.statistics.viewCount,
                    likeCount: item.statistics.likeCount,
                    dislikeCount: item.statistics.dislikeCount,
                    favoriteCount: item.statistics.favoriteCount,
                    commentCount: item.statistics.commentCount    
                };
    
            });
            //return videos object
            return stats;
        }

        function reduceMaxResults(data, maxResult){
            debugger
            let keys = Object.keys(data).slice(0, maxResult),
                newdata={};

            //add selection to new data object    
            keys.map((item)=>{
                newdata[item] = data [item];
            });
            //return new data
            return newdata;
        }
    }    
    /**
     * Reducer that manages ui state changes
     * like search term, number of items to 
     * return and start date of search selection
     * @param state current state of redux store
     * @param action action to be applied (props: type<string>, payload)
     */
    uiState(data=uiState,action){
         //log what is comming to reducer
         console.group("uiState reducer");
         console.log("Action:", action);
         console.log("Data:", data);
         console.groupEnd();
         //debugger
         //decide on action
         switch(action.type.toUpperCase()){
            case "GET_SEARCH_RESULT_START":
                //debugger
                //update serach term
                return {...data, search: action.payload} 
            case "SET_MAX_RESULTS":
                //debugger
                //create new object and 
                //update max result
                return {...data, maxResults: action.payload};
            case "REDUCE_MAX_RESULTS":
                //debugger
                //create new object and 
                //reduce nr of objects based on payload
                return {...data, maxResults: action.payload};

            case "SET_PUBLISHED_AFTER":
                //debugger
                //create new object and 
                //reduce nr of objects based on payload
                return {...data, publishedAfter: action.payload};
    
            default:
                //return unchanged data
                return data;
         }
    }
    
    
}
