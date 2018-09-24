function ResizableObject() {
    this.limit = 10;
}

ResizableObject.prototype = new CustomEventTarget();
ResizableObject.prototype.constructor = ResizableObject;
Object.assign(ResizableObject.prototype, {
    setWidth: function(val) {
        this.elementWidth = val;
        this.element.setAttribute("width", val);
    },

    getWidth: function() {
        return this.elementWidth;
    },

    setHeight: function(val) {
        this.elementHeight = val;
        this.element.setAttribute("height", val);
    },

    getHeight: function() {
        return this.elementHeight;
    },

    setX: function(x) {
        this.x = x;
        this.element.setAttribute("x", x);
    },

    getX: function() {
        return this.element.x.baseVal.value;
    },

    setY: function(y) {
        this.y = y;
        this.element.setAttribute("y", y);
    },

    getY: function() {
        return this.y
    },

    resize: function() {
        throw new Error("Resize function not implemented, ha ha ha!");
    }, 

    setResizePoints: function(points) {
        if (!this.resizePoints) {
            this.resizePoints = [];
        }

        for (var i = 0; i < points.length; i++) {
            this.resizePoints[i] = points[i];
        }
    },

    getResizePoints: function() {
        return this.resizePoints;
    }
});