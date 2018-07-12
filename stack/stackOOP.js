function Stack() {
   var stack1 = [];
   var maxSize = 5

   this.push = function(x){
       if (stack1.length < maxSize) {
            stack1.push(x);
       }
   };

   this.pop = function(){
       return stack1.pop();
   };

   this.topEl = function(){
       return stack1[stack1.length-1];
   };

   this.isEmpty = function(){
       if (stack1.length == 0) {
           return true;
       } else {
           return false;
       }
   };

   this.isFull = function() {
        if (stack1.length == maxSize) {
            return true; 
        } else {
            return false;
        }
   }

   this.getSize = function(){
       return stack1.length;
   };

   this.clear = function(){
       stack1 = [];
   };

   this.print = function(){
       console.log(stack1.toString());
   };
}

var myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);

//myStack.print();