
function Group(container, prefix, groupType, btnData, grState) {
    this.container = container;
    this.prefix = prefix;
    this.groupType = groupType;
    this.grState = grState;
    this.groupSuport = null;
    this.btnData = btnData;
    this.btns = [];
    this.init();
    this.setGroupState(grState);
}

Group.prototype = new CustomEventTarget();
Group.prototype.constructor = Group;
Object.assign(Group.prototype, {
    init: function() {
        var groupSuport = document.createElement("div");
        this.groupSuport = groupSuport;
        this.groupBehaviourListener = this.groupBehaviour.bind(this);
        for(var i = 0; i < this.btnData.length; i++) {
            var button = new Button(this.btnData[i].name, 
                                    this.btnData[i].selected, 
                                    this.btnData[i].customStyle, 
                                    groupSuport, 
                                    this.btnData[i].btnType,
                                    this.btnData[i].enabled);

            button.addListener("change", this.groupBehaviourListener);
            this.btns.push(button);
        } 
        groupSuport.className = "groupSuport" + " " + this.prefix;
        this.container.appendChild(groupSuport);
        this.checkBehavior();
    },

    checkBehavior: function() {
        if (this.groupType == "radio") {
            var arr=[];
            for (var i = 0; i < this.btns.length; i++) {
                if (this.btns[i].getState() == true) {
                    this.btns[i].setState(true);
                }

                if (this.btns[i].getState() == true) {    
                    arr.push(this.btns[i]);
                }
            }

            arr[0].setState(true);
            for (var j=1; j<arr.length; j++) {
                arr[j].setState(false);
            }
        }

        if (this.groupType == "checkbox") {
            for (var i = 0; i < this.btns.length; i++) {
                if (this.btns[i].getState() == true) {
                    this.btns[i].setState(true);
                }
            }
        }
    },

    setGroupState: function(grState) {
        this.grState = grState;
        if (this.grState == false) {
            for (var i = 0; i < this.btns.length; i++) {
                this.btns[i].setEnable(false);
            }
        } else if (this.grState == true) {
            for (var i = 0; i < this.btns.length; i++) {
                this.btns[i].setEnable(true);
            }
        }
    },

    getGroupState: function() {
        return this.grState;
    },

    groupBehaviour: function(e) {
        if (this.groupType == "radio") { 
            for (var i = 0; i < this.btns.length; i++) {
                if(e.target != this.btns[i]) {
                    this.btns[i].setState(false);
                } else if (e.target = this.btns[i]) {
                    this.btns[i].setState(true);
                }
            }         
        }
        this.fire({
            type: "change",
            data: {
                btn: e.target
            }
        })
    },

    getSelectedButtons: function() {
        var buttonsSelected = [];
        for(var i = 0; i < this.btns.length; i++) {
            if (this.btns[i].getState() === true) {
                buttonsSelected.push(this.btns[i]);
            }
        }
        return buttonsSelected;
    },

    getUnselectedButtons: function() {
        var buttonsUnselected = [];
        for(var i = 0; i < this.btns.length; i++) {
            if (this.btns[i].getState() == false) {
                buttonsUnselected.push(this.btns[i]); 
            }
        }
        return buttonsUnselected;
    },

    setGroupType: function(groupType) {
        this.groupType = groupType;

        if (this.groupType == "radio") {
            this.groupSuport.classList.remove("check");
            this.groupSuport.classList.add("radio");
            this.checkBehavior();
        } else if (this.groupType == "checkbox") {
            this.groupSuport.classList.remove("radio");
            this.groupSuport.classList.add("check");
        }
    },

    getGroupType: function() {
        return this.groupType;
    },

    removeGroup: function() {
        this.groupSuport.remove();
    }
});


