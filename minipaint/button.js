function Button(name, selected, customStyle, parentContainer, btnType, enabled) {
    this.name = name;
    //this.selected = selected;
    this.customStyle = customStyle;
    this.parentContainer = parentContainer;
    this.btnType = btnType;
    this.enabled = enabled;
    this.el = this.drawBtn();
    this.setState(selected);
}

Button.prototype = new CustomEventTarget();
Button.prototype.constructor = Button;

Object.assign(Button.prototype, {
    drawBtn: function() {
        var btn = document.createElement("div");
        this.btn = $(btn);
        var parent = this.parentContainer;

        this.mouseClickListener = this.click.bind(this);

        btn.className = "btn" + " " + this.customStyle;
        btn.addEventListener("click", this.mouseClickListener);
        btn.innerHTML = this.name;
        parent.appendChild(btn);
        return btn;
    },

    click: function(event) {  
        //this.setState(!this.selected);
        this.fire({
            type: "change", 
            data: {
                newState: this.selected
            }
        });
    },

    setState: function(selected) {   
        this.selected = selected;
        if (this.selected == false) {
            this.btn.removeClass("btn--selected");
        } else if (this.selected == true) {
            this.btn.addClass("btn--selected");
        }
    }, 

    getState: function() {
        return this.selected;
    },

    setEnable: function(enabled) {
        this.enabled = enabled;
        if(this.enabled == false) {
            this.btn.addClass("btn--disabled");   
            this.btn[0].removeEventListener("click", this.mouseClickListener);
        } else if (this.enabled == true) {
            this.btn.removeClass("btn--disabled");
            this.btn[0].addEventListener("click", this.mouseClickListener);
        }
    },

    getEnable: function() {
        return this.enabled;
    },

    getLabel: function() {
        return this.name;
    }
});

