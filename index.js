'use strict';

class ContextMaze {
   constructor(name) {
       this.name = name;
   }
   static createChained(){
       const a = new ContextMaze("A");
       const b = new ContextMaze("B");
       a.log();
       b.log();
       a.nested(b.log);
       b.nested(a.delayLog);
       const lost = a.log;
       lost.call(b);
   }
   get log(){
       const owner = this;
       function fn(){console.log(this.name);}
       fn.owner = owner;
       return fn;
   }
   get delayLog() {
       const owner = this;
       function fn(){
           const self = this;
           setTimeout(function (){
               console.log('delayLog anonimous:', self.name);
           }, 1000);
           setTimeout(()=>{
               console.log('delayLog arrow:', this.name);
           }, 1000);
           setTimeout(function (){
               console.log('delayLog bind:', this.name);
           }.bind(this), 1000);
       }
       fn.owner = owner;
       return fn;
   }
   nested(fn){
       const ctx = fn.owner || this;
       return fn.call(ctx);
   }
}
ContextMaze.createChained();