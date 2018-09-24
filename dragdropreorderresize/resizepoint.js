function Resizepoint (parent, position) {
    this.parent = parent;
    this.position = position;
    this.createResizePoints();
}

Resizepoint.prototype = new DragAndDrop();
Resizepoint.prototype.constructor = Resizepoint;
Object.assign(Resizepoint.prototype, {
    createResizePoints: function() {
        var rWidth = 10;
        var strokeWidth = 2;

        var resizePoint = document.createElementNS( "http://www.w3.org/2000/svg","rect");
        this.resizePoint = resizePoint;
            resizePoint.setAttribute("width", rWidth);
            resizePoint.setAttribute("height", rWidth);
            resizePoint.setAttribute("fill", "white");
            resizePoint.setAttribute("stroke", "green");
            resizePoint.setAttribute("stroke-width", strokeWidth);
            resizePoint.setAttribute("class", "resizable");
            resizePoint.setAttribute("x", "-9999");
            resizePoint.setAttribute("y", "-9999");
        this.parent.appendChild(resizePoint);

        this.element = resizePoint;
        this.initializeDrag();
    }, 

    startDragHandler: function(event) {
        this.fire({
            type: "resizePointTouched",
            data: {
                startX: event.clientX - this.element.getBoundingClientRect().left,
                startY: event.clientY - this.element.getBoundingClientRect().top,
                position: this.position,
                element: this
            }
        });
    },

    mouseMoveHandler: function(event) {
        this.newX = event.clientX - this.element.getBoundingClientRect().left;
        this.newY = event.clientY - this.element.getBoundingClientRect().top;

        this.fire({
            type: "changed",
            data: {
                newY: this.newY,
                newX: this.newX,
                position: this.position,
                element: this.element
            }
        });
    },

    mouseUpHandler: function(event) {
        this.newX = event.clientX - this.element.getBoundingClientRect().left;
        this.newY = event.clientY - this.element.getBoundingClientRect().top;
        this.fire({
            type: "done",
            data: {
                newY: this.newY,
                newX: this.newX,
                position: this.position,
                element: this.element
            }
        })
    }
})

