import { Component, OnInit  } from '@angular/core';
@Component({
  selector: 'app-coachchat',
  templateUrl: './coachchat.page.html',
  styleUrls: ['./coachchat.page.scss'],
})
export class CoachchatPage implements OnInit {


  chats : any[] = [];
  message : string;
  sending : boolean;

  demoLastNum = 0;

  currentQuestion : any = {
    "type" : "slider"
  }

  constructor() { }

  ngOnInit() {

    let chats = [
      {
        "message" : "Hallo", 
        "createdAt" : new Date(), 
        "type" : "anwer",
        "isMe" : true
      },
      {
        "message" : "Hallo auch", 
        "createdAt" : new Date(), 
        "type" : "bot",
        "isMe" : false
      },
      {
        "message" : "wie gehts?", 
        "createdAt" : new Date(), 
        "type" : "anwer",
        "isMe" : true
      },
    ];

    this.chats = chats;

  }

  scrollIntoView(){
    let container = document.getElementById("chatbox");
    container.scrollTo(0,99999999);
  }

  sendMessage() {

    let self = this;
    
    let msg; 

    if (this.demoLastNum == 0){
      msg = {
        "message" : "Hallo", 
        "createdAt" : new Date(), 
        "type" : "anwer",
        "isMe" : true
      };
      this.demoLastNum = 1;
    }else{
      msg = {
        "message" : "Hallo auch", 
        "createdAt" : new Date(), 
        "type" : "bot",
        "isMe" : false
      };
      this.demoLastNum = 0;
    }

    this.chats.push(msg);

    setTimeout(function(){
      self.scrollIntoView();
    },50)
    

  }

}
