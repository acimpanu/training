function DragAndDrop(/*element*/) {
    //this.element = element;
    this.mouseX = 0;
    this.mouseY = 0;
}

DragAndDrop.prototype = new CustomEventTarget();
DragAndDrop.prototype.constructor = DragAndDrop;
Object.assign(DragAndDrop.prototype, {
    initializeDrag: function() {
        this.startMovingListener = this.startMoving.bind(this);
        this.mouseMoveListener = this.mouseMove.bind(this);
        this.mouseUpListener = this.mouseUp.bind(this);
        
        this.element.addEventListener("mousedown", this.startMovingListener);
    },

    deInitializeDrag: function() {
        this.startMovingListener = null;
        this.mouseMoveListener = null;
        this.mouseUpListener = null;
        
        this.element.removeEventListener("mousedown", this.startMovingListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
    },

    startMoving: function (event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);

        this.startDragHandler(event);
    },

    startDragHandler: function(event) {
        throw "this must be overriden";
    },

    mouseMove: function(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

        this.mouseMoveHandler(event);
    },

    mouseMoveHandler: function(event) {
        throw "this must be overriden";
    },

    mouseUp: function(event) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);

        this.mouseUpHandler(event);
    },

    mouseUpHandler: function(event) {
        throw "this must be overriden";
    }
});










