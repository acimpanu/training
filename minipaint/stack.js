function Stack(maxSize) {
   this.stack = [];
   this.maxSize = maxSize;

   this.push = function(x){
       if (this.stack.length < maxSize) {
            this.stack.push(x);
       }
   };

   this.pop = function(){
       return this.stack.pop();
   };

   this.topEl = function(){
       return this.stack[this.stack.length-1];
   };

   this.isEmpty = function(){
       if (this.stack.length == 0) {
           return true;
       } else {
           return false;
       }
   };

   this.isFull = function() {
        if (this.stack.length == maxSize) {
            return true; 
        } else {
            return false;
        }
   }

   this.getSize = function(){
       return this.stack.length;
   };

   this.clear = function(){
       this.stack = [];
   };

   this.print = function(){
       return this.stack.toString();
   };
}

