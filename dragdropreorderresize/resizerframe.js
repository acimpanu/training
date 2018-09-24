function MixedObject() {}
Object.assign(MixedObject.prototype, CustomEventTarget.prototype);

function ResizerFrame (parent) {
    this.element = null;
    this.parent = parent;
    this.points = [];
    this.data = data;
    this.createBB();
}

ResizerFrame.prototype = Object.create(MixedObject.prototype);
ResizerFrame.prototype.constructor = ResizerFrame;
Object.assign(ResizerFrame.prototype, {
    createBB: function() {
        this.myGroup = document.createElementNS( "http://www.w3.org/2000/svg","g");
        this.parent.appendChild(this.myGroup);

        this.mouseDownListener = this.mousedown.bind(this);
        this.moveItListener = this.moveIt.bind(this);
        this.peDownListener = this.mouseUp.bind(this);

        bb = document.createElementNS( "http://www.w3.org/2000/svg","rect");
        this.bb = bb;
            bb.setAttribute("stroke", "green");
            bb.setAttribute("stroke-width", "2px");
            bb.setAttribute("fill", "none");
            bb.setAttribute("class", "boundingBox")
            this.drawBoundingBox();
        this.myGroup.appendChild(bb);

        for (var i = 0; i < 8; i++) {
            generalResizePoint = new Resizepoint(this.myGroup, positions[i]);
            this.points.push(generalResizePoint);

            this.element = generalResizePoint;

            generalResizePoint.addListener("resizePointTouched", this.mouseDownListener);
            generalResizePoint.addListener("changed", this.moveItListener);
            generalResizePoint.addListener("done", this.peDownListener);
        }
    },

    init: function() {
        this.rect = {
            x: this.element.element.x.baseVal.value,
            y: this.element.element.y.baseVal.value,
            w: this.element.elementWidth,
            h: this.element.elementHeight
        }
    },

    setSelectedElement: function(element) {
        this.element = element;
        this.positionOnElement();
        this.init();
        this.initialY = this.element.getY();
    }, 

    positionOnElement: function() {
        this.hideAllPoints();
        this.positionDragElements();
        this.drawBoundingBox();
    }, 

    hideAllPoints: function() {
        for (var i = 0; i < this.points.length; i++ ) {
            this.points[i].resizePoint.setAttribute("x", "-9999");
            this.points[i].resizePoint.setAttribute("y", "-9999");
        }
    },

    positionDragElements: function() {
        this.rWidth = 10;
        this.strokeWidth = 2;

        var count = this.element.resizePoints.length;

        for (var i = 0; i < count; i++ ) {
            if (this.element.resizePoints[i] == "top") {
                this.points[0].resizePoint.setAttribute("x", this.element.element.x.baseVal.value + this.element.element.width.baseVal.value/2 - this.rWidth/2);
                this.points[0].resizePoint.setAttribute("y",  - this.rWidth/2);
                this.points[0].resizePoint.setAttribute("cursor","n-resize");
            }

            if (this.element.resizePoints[i] == "right") {
                this.points[1].resizePoint.setAttribute("x", this.element.element.x.baseVal.value + this.element.element.width.baseVal.value - this.rWidth/2);
                this.points[1].resizePoint.setAttribute("y", this.element.element.height.baseVal.value / 2 - this.rWidth / 2 );
                this.points[1].resizePoint.setAttribute("cursor","e-resize");
            }

            if (this.element.resizePoints[i] == "bottom") {
                this.points[2].resizePoint.setAttribute("x", this.element.element.x.baseVal.value + this.element.element.width.baseVal.value/2 - this.rWidth/2);
                this.points[2].resizePoint.setAttribute("y", this.element.element.height.baseVal.value - this.rWidth/2);
                this.points[2].resizePoint.setAttribute("cursor","s-resize");
            }

            if (this.element.resizePoints[i] == "left") {
                this.points[3].resizePoint.setAttribute("x", this.element.element.x.baseVal.value - this.rWidth/2);
                this.points[3].resizePoint.setAttribute("y", this.element.element.height.baseVal.value / 2 - this.rWidth / 2 );
                this.points[3].resizePoint.setAttribute("cursor","w-resize");
            }

            if (this.element.resizePoints[i] == "topleft") {
                this.points[4].resizePoint.setAttribute("x", this.element.element.x.baseVal.value - this.rWidth/2);
                this.points[4].resizePoint.setAttribute("y",  - this.rWidth/2);
                this.points[4].resizePoint.setAttribute("cursor","nw-resize");
            }

            if (this.element.resizePoints[i] == "topright") {
                this.points[5].resizePoint.setAttribute("x", this.element.element.x.baseVal.value + this.element.element.width.baseVal.value - this.rWidth/2);
                this.points[5].resizePoint.setAttribute("y", - this.rWidth/2);
                this.points[5].resizePoint.setAttribute("cursor","ne-resize");
            }

            if (this.element.resizePoints[i] == "bottomleft") {
                this.points[6].resizePoint.setAttribute("x", this.element.element.x.baseVal.value - this.rWidth/2);
                this.points[6].resizePoint.setAttribute("y", this.element.element.height.baseVal.value - this.rWidth / 2 );
                this.points[6].resizePoint.setAttribute("cursor","sw-resize");
            }

            if (this.element.resizePoints[i] == "bottomright") {
                this.points[7].resizePoint.setAttribute("x", this.element.element.x.baseVal.value + this.element.element.width.baseVal.value - this.rWidth/2);
                this.points[7].resizePoint.setAttribute("y", this.element.element.height.baseVal.value - this.rWidth/2);
                this.points[7].resizePoint.setAttribute("cursor","se-resize");
            }
        }
    },

    drawBoundingBox: function() {
        if (this.element) {
            let bBox = this.element.element.getBBox();
            bb.setAttribute("width", bBox.width);;
            bb.setAttribute("height", bBox.height);
            bb.setAttribute("x", bBox.x);
            bb.setAttribute("y", "0");
        }
    },

    mousedown: function(event) {
        this.currentPointX = event.data.startX;
        this.currentPointY = event.data.startY;
    },

    moveIt: function(event) {
        switch (event.data.position) {
            case "top":
                this.element.resize("top", event.data.newY - this.currentPointY);
            break;

            case "right":
                this.element.resize("right", event.data.newX - this.currentPointX);
            break;

            case "bottom":
                this.element.resize("bottom", event.data.newY - this.currentPointY);
            break;

            case "left":
                this.element.resize("left", event.data.newX - this.currentPointX);
            break;

            case "topleft":
                this.element.resize("top", event.data.newY - this.currentPointY);
                this.element.resize("left", event.data.newX - this.currentPointX);
            break;

            case "topright":
                this.element.resize("top", event.data.newY - this.currentPointY);
                this.element.resize("right", event.data.newX - this.currentPointX);
            break;

            case "bottomleft":
                this.element.resize("bottom", event.data.newY - this.currentPointY);
                this.element.resize("left", event.data.newX - this.currentPointX);
            break;
            
            case "bottomright":
                this.element.resize("right", event.data.newX - this.currentPointX);
                this.element.resize("bottom", event.data.newY - this.currentPointY);
            break;
        }

        this.init();

        this.fire({
            type: "makeUpdatesOnResize",
            data: {
                position: event.data.position,
                x: this.rect.x,
                y: this.rect.y,
                w: this.rect.w,
                h: this.rect.h
            }
        });
    },

    mouseUp: function(event) {
        this.fire({
            type: "doneresizing",
            data: {
                x: this.rect.x,
                y: this.rect.y,
                w: this.rect.w,
                h: this.rect.h
            }
        })
    }
})