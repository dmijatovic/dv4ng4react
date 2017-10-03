import { Component, OnInit } from '@angular/core';

import { CombineStore } from './combine.store';

@Component({
  selector: 'app-combine',
  templateUrl: './combine.component.html',
  styleUrls: ['./combine.component.scss'],
  providers:[ CombineStore ]
})
export class CombineComponent implements OnInit {
  title="Combine reducers";
  explanation=`
    In this example we combine two reducers. First
    reducer updates firstName, lastName and Age.
    Use buttons to write name and age.
    Second reducer manages posts of this user.
    Use Add post button to add new post. After
    you added new post you can update 
    or delete specific post using post specific buttons. 
    The chalenge here is to use proper array/object manipulation functions
    in the reducer. This code and all ther store specific code is in combine.store.ts
    <br/><br>
    Examine console logs for store communication
    when events are fired. Store service injects
    reduxStore and is very simple wrapper arount it.
    In fact, redux store functions can be called
    directly using reduxStore prop in the service.
  `
  //default values 
  firstName:string="First";
  lastName:string="Last";
  age:number=0;
  posts=[{
    title:"Title",
    body:"this is body message",
    likes:0
  }]
  constructor(
    private store:CombineStore
  ) { }

  ngOnInit() {
    this.store.reduxStore.subscribe(()=>{
      //get store stuff
      let store = this.store.getState();
      this.updateComponent(store);
    });
    //initalize 
    this.store.dispatch({
      type:"DEFAULT"
    });
  }
  updateComponent(data){
    //debugger
    console.log("Update", data);
    //this is it
    this.firstName = data.user.firstName;
    this.lastName = data.user.lastName;
    this.age = data.user.age;
    //update posts
    this.posts = data.posts;
  }
  changeUser(type:string,payload:string){
    this.store.dispatch({
      type:type,
      payload:payload
    });
  }
  createPost(){
    this.store.dispatch({
      type:"CREATE",
      payload:{
        title:"Title",
        body:"This is body of the message",
        likes:this.posts.length,
        dislikes:0
      }
    });
  }
  deletePost(i){
    this.store.dispatch({
      type:"DELETE",
      payload: i
    });
  }
  updatePost(i){
    this.store.dispatch({
      type:"UPDATE",
      payload:{
        index: i,//index of item to be updated
        data:{ //new data to replace old
          title:"Updated title",
          body:"Updated message :-)",
          likes:i,
          dislikes:0
        }
      }
    });
  }
}
