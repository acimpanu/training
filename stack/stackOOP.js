function Stack(maxSize) {
   var stack = [];
   this.maxSize = maxSize;

   this.push = function(x){
       if (stack.length < maxSize) {
            stack.push(x);
       }
   };

   this.pop = function(){
       return stack.pop();
   };

   this.topEl = function(){
       return stack[stack.length-1];
   };

   this.isEmpty = function(){
       if (stack.length == 0) {
           return true;
       } else {
           return false;
       }
   };

   this.isFull = function() {
        if (stack.length == maxSize) {
            return true; 
        } else {
            return false;
        }
   }

   this.getSize = function(){
       return stack.length;
   };

   this.clear = function(){
       stack = [];
   };

   this.print = function(){
       return stack.toString();
   };
}
