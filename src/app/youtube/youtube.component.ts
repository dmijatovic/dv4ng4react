import { Component, OnInit } from '@angular/core';

import { YoutubeSvc } from './youtube.svc';
import { YoutubeStore } from './youtube.store';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss',
      '../ajax/ajax.component.scss'],
  providers:[ YoutubeSvc, YoutubeStore ]
})
export class YoutubeComponent implements OnInit {
  title="Search youtube";
  explanation=`
    What is this?
    <br/><br>
    This is more about youtube search api then
    redux. I strated using this project for 
    experimenting with everything.
  `
  //part of ui states
  search:string;
  maxResults:number;
  totalResults:number;
  publishedAfter:Date;  
  loader:boolean;
  errMsg:string;

  regionCode:string;
  videos=[];
  //stats=[];
  
  constructor(
    private dataSvc:YoutubeSvc,
    private dataStore:YoutubeStore
  ) { }

  ngOnInit() { 
    this.dataStore.redux.subscribe(()=>{
      //when this event triggers
      //something is changed in store
      //therefore we need to update 
      //ui
      //get current data info
      let data = this.dataStore.getState();
      this.mapSearch(data);
      this.mapVideo(data);
      this.mapUiVars(data);
    });
    //set inital values in dataStore
    this.dataStore.dispatch({
      type:"NG-ON-INIT"
    });
  }
  /**
   * Map data from uiState redux store 
   * to components ui
   * @param data redux store data/state
   */
  mapUiVars(data){
    //debugger 
    let keys = Object.keys(data.uiState);
    //just copy all data we have in infoSearch object
    keys.map((i)=>{
      this[i] = data.uiState[i];
    });    
  }
  mapSearch(data){
    //debugger 
    let keys = Object.keys(data.infoSearch);
    //just copy all data we have in infoSearch object
    keys.map((i)=>{
      this[i] = data.infoSearch[i];
    });    
  }
  //here we fuse video info and stats
  //based on videoId (object id)
  mapVideo(data){
    //debugger 
    let video = data.infoVideo,
        stats = data.statVideo,
        keys = Object.keys(video),
        videos=[];
    
    console.log("mapVideo",data);
    keys.map((item)=>{
      //debugger
      //check if we have stats
      //for this item
      let stat=stats[item];
      if (stat){        
        //convert videos 
        //that have stats
        let vid={
          etag:video[item].etag,
          id:video[item].id,        
          channelId:video[item].channelId,
          channelTitle:video[item].channelTitle,
          title:video[item].title, 
          description:video[item].description,
          publishedAt:video[item].publishedAt,
          defaultThumbnail:video[item].defaultThumbnail,
        }
        //add stats for this video
        //if we have this info      
        vid['viewCount']= stat.viewCount,
        vid['likeCount']= stat.likeCount,
        vid['dislikeCount']= stat.dislikeCount,
        vid['favoriteCount']= stat.favoriteCount,
        vid['commentCount']= stat.commentCount            
        //add video
        videos.push(vid);
      }  
    });
    //write it to component
    this.videos = videos;  
  }
  /**
   * triggered by slider change
  */  
  showItems(){
    //get info from store 

  }
  setMaxResults(){
    //get previous maxResults from store
    let preMax = this.dataStore.getState()
                      .uiState.maxResults;
    
    //debugger 
    //check first if we have search 
    if (this.search){
      if (preMax > this.maxResults){
        //we just need to reduce array of existing results
        //no request needed        
        this.dataStore.dispatch({
          type:"REDUCE_MAX_RESULTS",
          payload: this.maxResults
        });  
      }else{  
        //we need new request
        //first update max results value
        this.dataStore.dispatch({
          type:"SET_MAX_RESULTS",
          payload: this.maxResults
        });  
        //make new search request
        this.getSearch();
      }
    }else{
      //just update max results value
      this.dataStore.dispatch({
        type:"SET_MAX_RESULTS",
        payload: this.maxResults
      });
    };   
  }
  setPublishedAfter(){
    //console.log("Set change");
    //just update max results value
    this.dataStore.dispatch({
      type:"SET_PUBLISHED_AFTER",
      payload: this.publishedAfter
    });

    if (this.search){
      //make new search request
      this.getSearch();
    }
  }
  letSearch(){
    console.log("Search for...",this.search);
    
    if (this.search){
      //fire start event (not utilized yet)
      this.dataStore.dispatch({
        type:"GET_SEARCH_RESULT_START",
        payload: this.search
      });
      //make new search request
      this.getSearch();
    }    
  }
  getSearch(){
     //get data
     this.dataSvc.getSearch({
      q:this.search, 
      publishedAfter: this.publishedAfter.toISOString(),
      maxResults: this.maxResults})
      .subscribe((d)=>{
        console.log(d)
        this.setSearchInfo(d);
      });
  }
  setSearchInfo(d){
    if (d){
      //debugger 
      //lets publish to store
      this.dataStore.dispatch({
        type:"GET_SEARCH_RESULT_END",
        payload:d 
      });
      //debugger
      //OK now get stats for these items
      this.getStats(d.items);
    }
  }
  getStats(d){
    //debugger 
    //extract list of videoId's
    //we want stats to have
    let itemList = d.map((item)=>{
      return item.id.videoId
    });
    //if we have some
    if (itemList.length > 0){
      //dispatch loading action?!?
      //this.dataStore.dispatch({
      //  type:"GET_VIDEO_STATS_START"
      //});
      //get stats for videos in the list
      this.dataSvc.getStats(itemList)
      .subscribe((d)=>{
        //log response        
        console.log(d);
        
        //lets publish to store
        this.dataStore.dispatch({
          type:"GET_VIDEO_STATS_END",
          payload:d
        });        
      });
    }    
  }

  sendKey($event){
    console.log($event);
  }
}
