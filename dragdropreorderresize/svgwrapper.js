function MixedObject() {}
Object.assign(MixedObject.prototype, CustomEventTarget.prototype);
Object.assign(MixedObject.prototype, Resizepoint.prototype);
Object.assign(MixedObject.prototype, ResizerFrame.prototype);
Object.assign(MixedObject.prototype, Svgrect.prototype);

function Svgwrapper(parent, elementWidth, elementHeight, data) {
    this.parent = parent;
    this.elementWidth = elementWidth;
    this.elementHeight = elementHeight;
    this.data = data;
    this.initY = 20;
    this.elements = [];
    this.spaces = [];
    this.resizeGroup = null;
    this.selectedRect = null;
    this.createSvg();
}

Svgwrapper.prototype = Object.create(MixedObject.prototype);
Svgwrapper.prototype.constructor = Svgwrapper;
Object.assign(Svgwrapper.prototype, {
    createSvg: function() {
        var rect;
        var spaceRect;

        var theSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        theSvg.setAttribute("height", this.elementHeight);
        theSvg.setAttribute("width", this.elementWidth);
        this.parent.appendChild(theSvg);
        this.element = theSvg;
    
        this.checkCollisionListener = this.checkCollisionOnMove.bind(this);
        this.handleRectDragStopListener = this.handleRectDragStop.bind(this);
        this.addResizableGroupListener = this.addResizableGroup.bind(this);

        var firstSpace = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        firstSpace.setAttribute("x", "0");
        firstSpace.setAttribute("y", "0");
        firstSpace.setAttribute("class", "spacer");
        firstSpace.setAttribute("width", "100%");
        firstSpace.setAttribute("height", this.initY);
        firstSpace.setAttribute("id", "rect0");
        theSvg.appendChild(firstSpace);

        this.spaces.push({
            x: 0, 
            y: 0,
            width: 1000,
            height: 20,
            id: "rect" + 0
        });

        for (var i = 0; i < this.data.length; i++) {
            rect = new Svgrect(this.element, this.data[i].width, this.data[i].height, this.data[i].spacing);
            rect.setIndex(i);
            this.elements.push(rect);
            rect.setResizePoints(this.data[i].resizePoints);

            rect.addListener("themouseisdown", this.addResizableGroupListener);
            rect.addListener("change", this.checkCollisionListener);
            rect.addListener("dragStop", this.handleRectDragStopListener);

            spaceRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                spaceRect.setAttribute("class", "spacer");
                spaceRect.setAttribute("width", "100%");
                spaceRect.setAttribute("height", this.data[i].spacing);
                spaceRect.setAttribute("id", "rect" + (i + 1));
            theSvg.appendChild(spaceRect);
            this.spaces.push({
                x: 0, 
                y: 0,
                width: 1000,
                height: this.data[i].spacing,
                id: "rect" + (i + 1)
            });

        }
        this.positionElements();
        this.createSeparator(theSvg);

        this.updateElementHandler = this.updateElement.bind(this);
        this.doneresizingHandler = this.doneResizing.bind(this);

        this.resizeGroup = new ResizerFrame(theSvg);

        this.resizeGroup.addListener("makeUpdatesOnResize", this.updateElementHandler);
        this.resizeGroup.addListener("doneresizing", this.doneresizingHandler);
    },

    createSeparator: function(parent) {
        separator = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            separator.setAttribute("class", "separator");
            separator.setAttribute("width", this.elementWidth);
            separator.setAttribute("height", "2");
            separator.setAttribute("x", "0");
            separator.setAttribute("y", "-9999");
            separator.setAttribute("fill", "green")
        parent.appendChild(separator);
    },

    positionElements: function() {
        var nY = this.initY;
        var sY;
        var rect;
        for (var i = 0; i < this.elements.length; i++) {
            spaceRect = document.getElementById(this.spaces[i + 1].id);
            rect = this.elements[i];
            rect.setY(nY);
            nY += rect.getHeight(); 
            this.spaces[i + 1].y = nY;
            spaceRect.setAttribute("y", nY);
            nY += rect.getSpace();
        }
    },

    placeSeparator: function(index) {
        var space = this.spaces[index];
        var halfSeparatorHeight = 1;
        if (index > -1) {
            separator.setAttribute("y", space.y + space.height / 2 - halfSeparatorHeight);
        } else {
            separator.setAttribute("y", "-9999");
        }
    },

    checkCollisionOnMove: function(event) {
        var elementIndex = event.data.element.getIndex();
        var spacerIndex = -1;
        
        for (var i = 0; i < this.spaces.length; i++) {
            var offsetY = this.parent.offsetTop - document.documentElement.scrollTop;
            if (i == elementIndex || i == elementIndex + 1) {
                continue;
            }
            if (this.spaces[i].y + offsetY <= event.data.newY && event.data.newY <= this.spaces[i].y + offsetY + this.spaces[i].height) {
                spacerIndex = i;
            }
        }
        
        this.placeSeparator(spacerIndex);
        this.t = event.data.newY - this.parent.offsetTop;
        this.resizeGroup.myGroup.setAttribute("transform", "translate(0, " + this.t + ")")
    },

    rearrangeArray: function(arr, old_index, new_index) {
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        for (var i = 0; i < arr.length; i++) {
            arr[i].setIndex(i);
        }
    },

    handleRectDragStop: function(event) {
        var index = -1;
        var element;

        element = this.elements[event.data.element.getIndex()];
        for (var i = 0; i < this.spaces.length; i++) {
            var offsetY = this.parent.offsetTop - document.documentElement.scrollTop;
            if (this.spaces[i].y + offsetY <= event.data.newY && event.data.newY <= this.spaces[i].y + offsetY + this.spaces[i].height) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            this.oldIndex = element.index;
            if (index == 0) {
                this.newIndex = 0;
            } else if (index < this.newIndex) {
                this.newIndex = this.elements[index].index;
            } else {
                this.newIndex = this.elements[index-1].index;
            }
            this.rearrangeArray(this.elements, this.oldIndex, this.newIndex);
            this.positionElements();
        }
        element.setY(element.getY());

        this.resizeGroup.myGroup.setAttribute("transform", "translate(0, " + element.getY() + ")");
        separator.setAttribute("y", "-9999");
        this.resizeGroup.init();
    },

    addResizableGroup: function(event) {
        this.resizeGroup.myGroup.setAttribute("transform", "translate(0, -9999)");
        this.resizeGroup.setSelectedElement(event.data.element);
        this.resizeGroup.positionOnElement();
        this.selectedRect = event.data.element;
    },

    updateElement: function(event) {
        this.limit = 10;
        switch (event.data.position) {
            case "top": 
                //if (event.data.h < this.limit) return;
                this.resizeGroup.myGroup.setAttribute("transform", "translate(0, " + event.data.y + ")");
                this.resizeGroup.positionOnElement();
            break;

            case "right": 
               // if (event.data.w < this.limit) return;
                this.resizeGroup.positionOnElement();
            break;

            case "bottom":
                //if (event.data.h < this.limit) return;
                this.resizeGroup.positionOnElement();
            break;

            case "left":
               // if (event.data.w < this.limit) return;
                this.resizeGroup.positionOnElement();
            break;

            case "topleft": 
                //if (event.data.w < this.limit && event.data.h < this.limit) return;
                this.resizeGroup.myGroup.setAttribute("transform", "translate(0, " + event.data.y + ")");
                this.resizeGroup.positionOnElement();
            break;

            case "topright": 
                //if (event.data.w < this.limit && event.data.h < this.limit) return;
                this.resizeGroup.myGroup.setAttribute("transform", "translate(0, " + event.data.y + ")");
                this.resizeGroup.positionOnElement();
            break;

            case "bottomleft": 
                //if (event.data.w < this.limit && event.data.h < this.limit) return;
                this.resizeGroup.positionOnElement();
            break;

            case "bottomright": 
                //if (event.data.w < this.limit && event.data.h < this.limit) return;
                this.resizeGroup.positionOnElement();
            break;
        }

        this.fire({
            type: "sendDetails",
            data: {
                newY: event.clientY,
                element: this
            }
        })
    },

    doneResizing: function() {
        this.positionElements();
        this.resizeGroup.myGroup.setAttribute("transform", "translate(0, " + this.selectedRect.getY() + ")");
        this.resizeGroup.init();
    }
})

