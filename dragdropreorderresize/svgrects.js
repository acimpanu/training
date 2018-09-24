function MixedObject() {}
Object.assign(MixedObject.prototype, DragAndDrop.prototype);
Object.assign(MixedObject.prototype, ResizableObject.prototype);
Object.assign(MixedObject.prototype, CustomEventTarget.prototype);

function Svgrect(parent, elementWidth, elementHeight, elementSpace) {
    this.parent = parent;
    this.elementWidth = elementWidth;
    this.elementHeight = elementHeight;
    this.elementSpace = elementSpace;
    this.createPath();
    this.index = -1;
    this.y = 0;
    this.limit = 10;
}

Svgrect.prototype = Object.create(MixedObject.prototype);
Object.assign(Svgrect.prototype, {
    constructor: Svgrect,
    createPath: function() {
        var newRect = document.createElementNS( "http://www.w3.org/2000/svg","rect");
            newRect.setAttribute("fill", "lightgreen");
            newRect.setAttribute("width", this.elementWidth);
            newRect.setAttribute("height", this.elementHeight);
            newRect.setAttribute("x", "30");
            newRect.setAttribute("y", "30");
        this.parent.appendChild(newRect);

        this.element = newRect;
        this.initializeDrag();
    },

    setIndex: function(i) {
        this.index = i;
    },  

    getIndex: function(i) {
        return this.index;
    },  

    getSpace: function() {    
        return this.elementSpace;
    },

    startDragHandler: function(event) {
        this.fire({
            type: "themouseisdown",
            data: {
                element: this
            }
        });
    },

    mouseMoveHandler: function(event) {
        this.fire({
            type: "change",
            data: {
                newY: event.clientY,
                element: this
            }
        });
        this.newY = event.clientY - this.parent.getBoundingClientRect().top;
        this.element.setAttribute("y", this.newY);
    },

    mouseUpHandler: function(event) {
        this.fire({
            type: "dragStop",
            data: {
                newY: event.clientY,
                element: this
            }
        })
    },

    resize: function(position, delta) {
        switch (position) {
            case "top":
                this.resizeTop(delta);
            break;

            case "right":
                this.resizeRight(delta);
            break;

            case "bottom":
                this.resizeBottom(delta);
            break;

            case "left":
                this.resizeLeft(delta);
            break;

            case "topleft":
                this.resizeTopleft(delta);
            break;

            case "topright":
                this.resizeTopright(delta);
            break;

            case "bottomleft":
                this.resizeBottomleft(delta);
            break;

            case "bottomright":
                this.resizeBottomright(delta);
            break;
        }

        this.fire({
            type: "rectResized",
            data: {
                x: this.getX(),
                y: this.getY(),
                w: this.getWidth(),
                h: this.getHeight()
            }
        })
    },

    resizeTop: function(delta) {
        var h = this.getHeight();
        if (h - delta < this.limit) {
            return;
        }
        var y = this.getY();
        this.setY(y + delta);
        this.setHeight(h - delta);
    },

    resizeRight: function(delta) {
        var w = this.getWidth();
        if (w + delta < this.limit) {
            return;
        }

        this.setWidth(w + delta);
    },

    resizeBottom: function(delta) {
        var h = this.getHeight();
        if (h + delta < this.limit) {
            return;
        }

        this.setHeight(h + delta);
    }, 

    resizeLeft: function(delta) {
        var w = this.getWidth();
        if (w - delta < this.limit) {
            return;
        }

        this.setWidth(w - delta);

        var x = this.getX();
        this.setX(x + delta);
    },

    resizeTopleft: function(delta) {
        var h = this.getHeight();
        var w = this.getWidth();
        this.resizeTop(delta);
        this.resizeLeft(delta);
    },

    resizeTopright: function(delta) {
        var h = this.getHeight();
        var w = this.getWidth();

        if (w + delta < this.limit && h + delta < this.limit) {
            return;
        } 
        this.resizeRight(delta);
        this.resizeTop(delta);
    },

    resizeBottomleft: function(delta) {
        var h = this.getHeight();
        var w = this.getWidth();
        if (w - delta < this.limit && h - delta < this.limit) {
            return;
        }
        this.resizeBottom(delta);
        this.resizeLeft(delta);
    },

    resizeBottomright: function(delta) {
        var h = this.getHeight();
        var w = this.getWidth();
        if (h + delta < this.limit && w + delta < this.limit) {
            return;
        }

        this.resizeBottom(delta);
        this.resizeRight(delta);
    }
});