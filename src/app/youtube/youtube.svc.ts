//angular
import { Injectable } from '@angular/core';
import { Http, RequestOptions  ,Headers, URLSearchParams } from '@angular/http';

//RxJs
import { Observable } from 'rxjs/Observable';

@Injectable()
export class YoutubeSvc{
    //simple test api point
    private apiPoint:string="https://www.googleapis.com/youtube/v3/";

    constructor(
        private http:Http 
    ){}
    getCategories(){
        
    }   
    //Construct search string 
    //for youtube api
    getSearchParam(search:any){
        let q = {
            part:'snippet',            
            q: search.q,
            type:'video',
            order:'viewCount',
            publishedAfter:search.publishedAfter,
            safeSearch:'strict',
            maxResults:search.maxResults,
            key:'AIzaSyD7di3Oi7fVrsqJjBOBTHrY4vfbkotyOrk',
            //field selection need to be one line, no spaces returns etc!
            fields:"items(etag,id/videoId,snippet(channelId,channelTitle,description,publishedAt,thumbnails/default,title)),nextPageToken,pageInfo,prevPageToken,regionCode"
        };
        let key = Object.keys(q);
        let query = new URLSearchParams();      
        //add search params to query
        key.map((item)=>{
            query.set(item,q[item])
        });
        //return searchparam object
        return query;
    }
    /**
     * Construct query parameters for http request
     * to youtube/v3/video API
     * @param videos provide array of videoIds
     */
    getStatParam(videos:Array<any>){
        let q = {            
            part:'statistics',
            id: videos.join(","),            
            key:'AIzaSyD7di3Oi7fVrsqJjBOBTHrY4vfbkotyOrk',
        };
        let key = Object.keys(q);
        let query = new URLSearchParams();      
        //add search params to query
        key.map((item)=>{
            query.set(item,q[item])
        });
        //return searchparam object
        return query;
    } 
    //get data using RxJS
    //it returnes observable
    getSearch(query:any):Observable<any>{
        //debugger
        //build search param        
        let url = this.apiPoint + "search";         
        //debugger
        return this.http.get(url, {
            search: this.getSearchParam(query)
        })
        .map((res)=>{
            //debugger
            let d = res.json();
            return d;
        });
    }
    //we expect array of video ids
    getStats(videos:any):Observable<any>{
        //debugger
        //build search param        
        let url = this.apiPoint + "videos";         
        //debugger
        return this.http.get(url, {
            search: this.getStatParam(videos)
        })
        .map((res)=>{
            //debugger
            let d = res.json();
            return d;
        });
    }
}