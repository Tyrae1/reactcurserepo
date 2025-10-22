'use strict';

class ContextMaze {
   constructor(name) {
       this.name = name;
   }
   log(){
       console.log(this.name);
   }

   delaylog() {
       setTimeout(function (){
           console.log('delaylog anonimous:', this && this.name);
       }, 1000);
       setTimeout(()=>{
           console.log('delaylog arrow:', this.name);
       }, 1000);
       setTimeout(function (){
           console.log('delaylog bind:', this.name);
       }.bind(this), 1000);
   }
   nested(fn){
      const boundFn = fn.bind(this);
      return boundFn();
   }
   createChained(){

   }
}

const a = new ContextMaze("A");
const b = new ContextMaze("B");

a.log();
b.log();
a.nested(b.log);
b.nested(a.delaylog);
const lost = a.log;
lost.call(b);