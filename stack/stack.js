var stack = [];
var maxSize = 5;
var index = 0;

function push(x) {
    if (index < maxSize) {
        index++;
        stack.push(x);
    } 
}

function pop() {
    if (index === -1) {
        return undefined;
    }

    index --;
    stack.pop();
}

function topEl() {
    return stack[index-1];
}

function isEmpty() {
    if (index === 0) {
        return true;
    } else {
        return false;
    }
}

function isFull() {
    if (index === maxSize) {
        return true;
    } else {
        return false;
    }
}

function getSize() {
    return index;
}

function clear() {
    return stack = [];
    index == 0;
}

push(10);
push(20);
push(30);
pop();
push(40);

function print() {
    console.log(stack,"Last in:" + topEl(), "is full: " + isFull(), "size is: " + getSize(), "is empty: " + isFull());
}
print();


