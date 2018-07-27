QUnit.test("first test", function(assert){
    var value="1";
    assert.equal(value, "1", "Value should be 1");
})

QUnit.test("another test", function(assert){
    assert.ok(1 == "1", "Passed!");
})

QUnit.test("Tests for the first stack", function(assert){
    var result = stack.toString();
    var full = isFull();
    var empty = isEmpty();
    var size = getSize();
    
    assert.equal(result, "10,20,40", "those are the values from my stack");
    assert.equal(full, false, "the stack is not full");
    assert.equal(empty, false, "the stack isn't empty");
    assert.equal(size, 3, "this is the correct size");
})

// ************************************************************************

QUnit.test("The push test", function(assert) {
    myStack.push(1);
    myStack.push(2);
    myStack.push(3);
    myStack.push(4);
    myStack.push(2);
    myStack.push(23);
    assert.equal(myStack.print(), "1,2,3,4,2");
})

QUnit.test("Full stack", function(assert) {
    assert.equal(myStack.isFull(), true)
})

QUnit.test("The pop method", function(assert) {
    myStack.pop();
    myStack.pop();
    assert.equal(myStack.print(), "1,2,3");
})

QUnit.test("Show me the size", function(assert) {
    assert.equal(myStack.getSize(), 3);
})

QUnit.test("Show me again the numbers", function(assert) {
    myStack.push(12);
    myStack.push(10);
    assert.equal(myStack.print(), "1,2,3,12,10");
})

QUnit.test("Clear all the content", function(assert) {
    myStack.clear();
    assert.equal(myStack.print(), "");
})

QUnit.test("Show me the size", function(assert) {
    assert.equal(myStack.getSize(), 0);
})