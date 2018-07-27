
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

function Paintscreen(nrLines, nrCols, parent, sWidth) {
    this.nrLines = nrLines;
    this.nrCols = nrCols;
    this.element = parent;
    this.sWidth = sWidth;
    this.matrix = [];
    this.addListners();
    this.mousePosition = {x: 0, y: 0};
    this.mouseIsDown = false;
    this.drawnPixels = {};
    this.drawModel();
    this.getDataFromStorage();
    this.drawMatrix();
    this.draw = true;
}

Paintscreen.prototype = new CustomEventTarget();
Paintscreen.prototype.constructor = Paintscreen;
Object.assign(Paintscreen.prototype, {
    drawMatrix: function() {
        var xpos, ypos;
        var screen = this.element;
        var elem;
        this.buttonElements = [];
        for (var i = 0; i < this.nrLines; i++) {
            this.buttonElements[i] = [];
            for (var j = 0; j < this.nrCols; j++) {
                elem = new Button("btn", this.matrix[i][j], "", screen, true);
                xpos = this.sWidth * i;
                ypos = this.sWidth * j;
                this.buttonElements[i][j] = elem;

                elem.el.style.position = "absolute";
                elem.el.style.left = xpos + "px";
                elem.el.style.top = ypos + "px";
                elem.el.style.width = this.sWidth + "px";
                elem.el.style.height = this.sWidth + "px";
            }
        }
    },

    addListners: function() {
        this.mouseDownHandler = this.mouseDown.bind(this);
        this.mouseUpHandler = this.mouseUp.bind(this);
        this.element.addEventListener("mousedown", this.mouseDownHandler);
        this.element.addEventListener("mouseup", this.mouseUpHandler);
    },

    drawModel: function() {
        for (var i = 0; i < this.nrLines; i++) {
            this.matrix[i] = [];
            for (var j = 0; j < this.nrCols; j++) {
                this.matrix[i][j] = 0;
            }
        }
    },

    mouseDown: function(e) {
        this.mousePosition.x = e.clientX;
        this.mousePosition.y = e.clientY;
        mouseIsDown = true;
        this.drawnPixels = {};
        this.mouseMoveHandler = this.mouseMove.bind(this);
        requestAnimationFrame(this.update.bind(this));
        document.addEventListener("mousemove", this.mouseMoveHandler);
    },

    mouseMove: function(e) { 
        this.mousePosition.x = e.clientX;
        this.mousePosition.y = e.clientY;
    },

    mouseUp: function(e) {
        mouseIsDown = false;
        if (Object.keys(this.drawnPixels).length) {
            this.fire({type: "draw", data: this.drawnPixels});
        }
        this.saveMatrix();
    },

    saveMatrix: function() {
        localStorage.setItem("item", JSON.stringify(this.matrix));
    },

    determineElementByCoord: function(x, y) {
        for (var i = 0; i < this.nrLines; i++) {
            for (var j = 0; j < this.nrCols; j++) {
                if (x > i * this.sWidth && x <= i * this.sWidth + this.sWidth && y > j * this.sWidth && y <= j * this.sWidth + this.sWidth) {
                    if (this.draw == true) {
                        if (this.buttonElements[i][j].getState() == false) {
                            this.buttonElements[i][j].setState(true);
                            this.matrix[i][j] = 1;
                            this.drawnPixels[i + "-" + j] = this.buttonElements[i][j].getState();
                        }
                    } else if (this.draw == false) {
                        if (this.buttonElements[i][j].getState() == true) {
                            this.buttonElements[i][j].setState(false);
                            this.matrix[i][j] = 0;
                            this.drawnPixels[i + "-" + j] = this.buttonElements[i][j].getState();
                        }
                    }
                    
                }
            }
        }
    },

    negatePixels: function(pixels) {
        for (var i = 0; i < pixels.length; i++) {
            this.buttonElements[pixels[i].x][pixels[i].y].setState(!pixels[i].state);
            if (this.matrix[pixels[i].x][pixels[i].y] == 1) {
                this.matrix[pixels[i].x][pixels[i].y] = 0;
            }
        }
        this.saveMatrix();
    },

    repaintPixels: function(pixels) {
        for (var i = 0; i < pixels.length; i++) {
            this.buttonElements[pixels[i].x][pixels[i].y].setState(pixels[i].state);
            if (this.matrix[pixels[i].x][pixels[i].y] == 0) {
                this.matrix[pixels[i].x][pixels[i].y] = 1;
            }
        }
        this.saveMatrix();
    },

    update: function() {   
        this.determineElementByCoord(this.mousePosition.x, this.mousePosition.y);
        if (mouseIsDown) {
            requestAnimationFrame(this.update.bind(this));
        }
    },

    clearScreen: function() {
        for (var i = 0; i < this.nrLines; i++) {
            for (var j = 0; j < this.nrCols; j++) {
                this.buttonElements[i][j].setState(false);
                this.matrix[i][j] = 0;
            }
        }
        this.saveMatrix();
        this.drawMatrix();
    },

    getDataFromStorage: function() {
        var localStorageItem = localStorage.getItem('item');
        if (localStorageItem) {
            this.matrix = JSON.parse(localStorageItem);
        }
    }, 

    setDrawMode: function(mode) {
        this.draw = mode;
    }, 

    getDrawMode: function() {
        return this.draw;
    }
});