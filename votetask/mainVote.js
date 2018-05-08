var Emitter = require('events');
var funcConfig = require('./config').functions;
var message = require('./config').messages;
var summSurvey = require('./config').summerySurvey;
var myEmtr = new Emitter();
var limitNumber = 10;

class Vote{


  constructor(variables){

    this.subject = variables[0];
    this.name1 = variables[1];
    this.name2 = variables[2];
    this.name3 = variables[3];
 

    // reset all votes
    this.v1 = 0;
    this.v2 = 0;
    this.v3 = 0;
 
  }

  pushTheLog(messag){

    message.push(messag);

  }

  pushToSummerySurvey(){
    summSurvey.push(this.subject);
    summSurvey.push(this.name1);
    summSurvey.push(this.v1);
    summSurvey.push(this.name2);
    summSurvey.push(this.v2);
    summSurvey.push(this.name3);
    summSurvey.push(this.v3);

  }

  reset(){
    this.v1 = 0;
    this.v2 = 0;
    this.v3 = 0;
    this.v4 = 0;
  }

  setV1(){
    if(this.v1 < limitNumber){
        this.v1 = this.v1 + 1;
    } 

  }

  setV2(){
    if(this.v2 < limitNumber){
        this.v2 = this.v2 + 1;
    }  
  }

   setV3(){
    if(this.v3 < limitNumber){
        this.v3 = this.v3 + 1;
    }  

  }


  print(){
    console.log(`subject: ${this.subject}`);
    this.pushTheLog(`subject: ${this.subject}`);
    console.log(`${this.name1}: ${this.v1}`);
    this.pushTheLog(`${this.name1}: ${this.v1}`);
    console.log(`${this.name2}: ${this.v2}`);
    this.pushTheLog(`${this.name2}: ${this.v2}`);
    console.log(`${this.name3}: ${this.v3}`);
    this.pushTheLog(`${this.name3}: ${this.v3}`);

  }

}



module.exports = (info)=>{


var thing = new Vote(info);

  console.log("START(before votes):");
  thing.pushTheLog("START(before votes):");

  thing.print();

  for (var i = 0; i < 7; i++) {
    myEmtr.emit(funcConfig.FUNCVOTE, thing, 'v1');

  }

  for (var i = 0; i < 4; i++) {
    myEmtr.emit(funcConfig.FUNCVOTE, thing, 'v2');
  }

  for (var i = 0; i < 18; i++) {
    myEmtr.emit(funcConfig.FUNCVOTE, thing, 'v3');
    
  }



  console.log("AFTER:");
  thing.pushTheLog("AFTER:");

  thing.print();
  console.log("______________________________________");
  thing.pushTheLog("______________________________________");

  thing.pushToSummerySurvey();
  return message.messages;

}


myEmtr.on(funcConfig.FUNCVOTE, (thing,v)=> {
 
  if(v == "v1")
    thing.setV1(); 

  if(v == "v2")
    thing.setV2(); 

  if(v == "v3")
    thing.setV3(); 

});






