//angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//RxJs
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AjaxSvc{
    //simple test api point
    private apiPoint:string="https://jsonplaceholder.typicode.com/users";

    constructor(
        private http:Http 
    ){}
    //fetch data using fetch api
    //it returns a promise
    fetchData(){
        //debugger
        return fetch(this.apiPoint);
    }
    //get data using RxJS
    //it returnes observable
    getData():Observable<any>{
        //debugger
        return this.http.get(this.apiPoint)
            .map((res)=>{
                //debugger
                let d = res.json();
                return d;
            });
    }
}