function Slider(min, max, sliderWidth, parentContainer, prefix) {
    this.min = min;
    this.max = max;
    this.sliderWidth = sliderWidth;
    this.prefix = prefix;
    this.parentContainer = parentContainer;
    this.mouseMoveListener = this.mouseMove.bind(this);
    this.mouseDownListener = this.mouseDown.bind(this);
    this.mouseUpListener = this.mouseUp.bind(this);
    this.mouseDownClickListener = this.clickCoord.bind(this);
    this.thumb = null;
    this.slider = null;
    this.draw();
};

function mixin(receiver, supplier) {
    for (var property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            receiver[property] = supplier[property]
        }
    }

    return receiver;
}

mixin(Slider.prototype, new EventTarget());
mixin(Slider.prototype, {
    constructor: Slider,

    listData: function() {
        return this.min + "|" + this.max + "|" + this.sliderWidth + "|" + this.parentContainer;
    },

    draw: function() {
        var slider = document.createElement("div");
        slider.className = "slider" + " " + this.prefix;
        slider.style.width = this.sliderWidth + "px";
        slider.style.background = this.bkgColor;
        slider.addEventListener("mousedown", this.mouseDownClickListener);
        this.slider = slider;
        var bod = this.parentContainer;
        bod.appendChild(slider);

        var thumb = document.createElement("div");
        thumb.className = "thumb";
        thumb.style.background = this.thumbColor;
        thumb.addEventListener("mousedown", this.mouseDownListener);
        this.thumb = thumb;
        slider.appendChild(thumb);

        return slider;
    },

    mouseDown: function(e) {
        this.mouseMove(e);
        document.addEventListener("mousemove", this.mouseMoveListener);
        document.addEventListener("mouseup", this.mouseUpListener);
    },

    mouseMove: function(e) {
        var limitLeft = 13;
        var limitRight = this.sliderWidth - 13;
        var sliderOffset = this.slider.offsetLeft;

        var newLeft = e.clientX - sliderOffset;
        var mouseX;
        var percent;
        var valoare;
    
        if (newLeft < limitLeft) {
            newLeft = limitLeft;
        }

        if (newLeft > limitRight) {
            newLeft = limitRight;
        }

        percent = (100 * (newLeft - limitLeft)) / (limitRight - limitLeft);
        valoare =  percent * (this.max - this.min) / 100 + this.min;

        console.log("valoare:" + valoare);
        console.log("procent:", percent);
        this.thumb.style.left = newLeft + 'px';
    },

    mouseUp: function(e) {
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
    },

    clickCoord: function(e) {
        this.mouseMove(e);
    }
})