function ResizerFrame (parent) {
    this.element = null;
    this.parent = parent;
    this.createBB();
    this.curentHandle = false;
    this.drag = false;
}

//ResizerFrame.prototype = Object.create(MixedObject.prototype);
ResizerFrame.prototype = Object.create(ResizeHandler);

ResizerFrame.prototype.constructor = ResizerFrame;
Object.assign(ResizerFrame.prototype, {
    getBB: function() {
        this.element.getBBox();
    },

    createBB: function() {
        myGroup = document.createElementNS( "http://www.w3.org/2000/svg","g");
            //myGroup.setAttribute("transform", "translate(0, 0)")
        this.parent.appendChild(myGroup);

        this.mouseDownListener = this.mousedown.bind(this);
        this.moveItListener = this.moveIt.bind(this);
        this.peDownListener = this.peDown.bind(this);

        bb = document.createElementNS( "http://www.w3.org/2000/svg","rect");
        this.bb = bb;
            bb.setAttribute("stroke", "pink");
            bb.setAttribute("stroke-width", "2px");
            bb.setAttribute("fill", "none");
            bb.setAttribute("class", "boundingBox")
            this.drawBoundingBox();
        myGroup.appendChild(bb);
        // il pun la -99999 

        this.leftPoint = new Resizepoint(myGroup, "left");
        this.leftPoint.element.setAttribute("class", "left");

        this.topPoint = new Resizepoint(myGroup, "top");
        this.topPoint.element.setAttribute("class", "top");

        this.rightPoint = new Resizepoint(myGroup, "right");
        this.rightPoint.element.setAttribute("class", "right");

        this.bottomPoint = new Resizepoint(myGroup, "bottom");
        this.bottomPoint.element.setAttribute("class", "bottom");

        this.leftPoint.addListener("resizePointTouched", this.mouseDownListener);
        this.leftPoint.addListener("changed", this.moveItListener);
        this.leftPoint.addListener("done", this.peDownListener);
    },

    setSelectedElement: function(element) {
        this.element = element;
        this.positionOnElement();;
    }, 

    positionOnElement: function() {
        this.drawBoundingBox();
        this.positionElements();
    }, 

    positionElementsInitial: function() {
        this.leftPoint.resizePoint.setAttribute("x", - this.rWidth/2);
        this.leftPoint.resizePoint.setAttribute("y", this.rWidth / 2 + 2.5 * this.strokeWidth);

        this.topPoint.resizePoint.setAttribute("x", resizeGroup.bb.width.baseVal.value/2 - this.rWidth/2);
        this.topPoint.resizePoint.setAttribute("y",  - this.rWidth/2);

        this.rightPoint.resizePoint.setAttribute("x", resizeGroup.bb.width.baseVal.value - this.rWidth/2);
        this.rightPoint.resizePoint.setAttribute("y", this.rWidth / 2 + 2.5 * this.strokeWidth);

        this.bottomPoint.resizePoint.setAttribute("x", resizeGroup.bb.width.baseVal.value/2 - this.rWidth/2);
        this.bottomPoint.resizePoint.setAttribute("y", resizeGroup.bb.height.baseVal.value - this.rWidth/2);
    },

    positionElements: function() {
        this.rWidth = 10;
        this.strokeWidth = 2;

        if (this.drag) {
            this.leftPoint.resizePoint.setAttribute("x", - this.rWidth/2 + delta);
            this.leftPoint.resizePoint.setAttribute("y", this.rWidth / 2 + 2.5 * this.strokeWidth);

            this.topPoint.resizePoint.setAttribute("x", resizeGroup.bb.width.baseVal.value/2 - this.rWidth/2  + delta);
            this.topPoint.resizePoint.setAttribute("y",  - this.rWidth/2);

            this.rightPoint.resizePoint.setAttribute("x", resizeGroup.bb.width.baseVal.value - this.rWidth/2  + delta);
            this.rightPoint.resizePoint.setAttribute("y", this.rWidth / 2 + 2.5 * this.strokeWidth);

            this.bottomPoint.resizePoint.setAttribute("x", resizeGroup.bb.width.baseVal.value/2 - this.rWidth/2  + delta);
            this.bottomPoint.resizePoint.setAttribute("y", resizeGroup.bb.height.baseVal.value - this.rWidth/2);

            //resizeGroup.bb.setAttribute("x", delta); // To be resolved
        } else {
            this.positionElementsInitial();
        }
    },

    drawBoundingBox: function() {
        if (this.element) {
            let bBox = this.element.element.getBBox();
            // myGroup.setAttribute("width", bBox.width);;
            // myGroup.setAttribute("height", bBox.height);
            // myGroup.setAttribute("x", bBox.x);
            // myGroup.setAttribute("y", bBox.y);
        }
    },

    setWidth: function(val) {
        this.bb.setAttribute("width", val);
    },

    getWidth: function() {
        return this.bb.width.baseVal.value;
    },

    setHeight: function() {
        this.bb.setAttribute("height", val);
    },

    getHeight: function() {
        return this.bb.height.baseVal.value;
    },

    setX: function(x) {
        this.bb.setAttribute("x", x);
    },

    setY: function(y) {
        this.bb.setAttribute("y", y);
    },

    point: function(x,y) {
        return {
            x: x,
            y: y
        }
    },

    dist: function(p1,p2) {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    },

    getHandle: function(mouse) {
        this.handlesSize = 10;
        if (this.dist(mouse, this.point(this.element.x, this.element.y)) <= this.handlesSize) {
            return 'topleft';
        }
        if (this.dist(mouse, this.point(this.element.x + this.element.w, this.element.y)) <= this.handlesSize) {
            return 'topright';
        }
        if (this.dist(mouse, this.point(this.element.x, this.element.y + this.element.h)) <= this.handlesSize) {
            return 'bottomleft';
        }
        if (this.dist(mouse, this.point(this.element.x + this.element.w, this.element.y + this.element.h)) <= this.handlesSize) {
            return 'bottomright';
        }
        if (this.dist(mouse, this.point(this.element.x + this.element.w / 2, this.element.y)) <= this.handlesSize) {
                return 'top';
        }
        if (this.dist(mouse, this.point(this.element.x, this.element.y + this.element.h / 2)) <= this.handlesSize) {
            return 'left';
        }
        if (this.dist(mouse, this.point(this.element.x + this.element.w / 2, this.element.y + this.element.h)) <= this.handlesSize) {
            return 'bottom';
        }
        if (this.dist(mouse, this.point(this.element.x + this.element.w, this.element.y + this.element.h / 2)) <= this.handlesSize) {
            return 'right';
        }
        return false;
    },

    mousedown: function(event) {
        console.log(event.data.position);
    },

    moveIt: function(event) {
        this.drag = true;
        rect = {
            x: resizeGroup.element.element.x.baseVal.value,
            y: resizeGroup.element.element.y.baseVal.value,
            w: resizeGroup.element.elementWidth,
            h: resizeGroup.element.elementHeight
        }

        rect.w += rect.x - event.data.newX;
        rect.x = event.data.newX;

        delta = event.data.newX;

        resizeGroup.setWidth(rect.w);
        resizeGroup.bb.parentElement.setAttribute("width", rect.w);
        resizeGroup.bb.setAttribute("x", delta);//to be resolved
        
        this.positionElements();

        // resizeGroup.element.element.setAttribute("x", event.data.newX);
        // resizeGroup.setX(rect.x);
    },

    peDown: function(event) {
        this.drag = false;

        // rect = {
        //     x: resizeGroup.element.element.x.baseVal.value,
        //     y: resizeGroup.element.element.y.baseVal.value,
        //     w: resizeGroup.element.elementWidth,
        //     h: resizeGroup.element.elementHeight
        // }

        rect.w += rect.x - event.data.newX;
        rect.x = event.data.newX;

        resizeGroup.element.element.setAttribute("width", rect.w);
        resizeGroup.bb.parentElement.setAttribute("width", rect.w);
        resizeGroup.element.element.setAttribute("x", rect.x);
    }
})