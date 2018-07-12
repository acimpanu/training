var container1 = document.getElementById("grup1");
var container2 = document.getElementById("grup2");  


var btn = [
    {
        name: "btn1",
        selected: false,
        customStyle: ""
    },
    {
        name: "btn2",
        selected: true,
        //customStyle: "btn--disabled"
        customStyle: ""
    },
    {
        name: "btn3",
        selected: false,
        customStyle: ""
    },
    {
        name: "btn4",
        selected: true,
        customStyle: ""
    }
];

var btn2 = [
    {
        name: "a",
        selected: true,
        customStyle: ""
    },
    {
        name: "b",
        selected: true,
        //customStyle: "btn--disabled"
        customStyle: ""
    },
    {
        name: "c",
        selected: false,
        customStyle: ""
    },
    {
        name: "d",
        selected: true,
        customStyle: ""
    }
];


var group1 = new Group(container1, "green", "radio", btn, true);
var group2 = new Group(container2, "blue", "checkbox", btn2, true);

//group2.setType("radio");

//group2.setGroupState(false);
//group1.setGroupState(false);
//group2.btns[1].setEnable(false);

// var allOver = document.getElementsByTagName("body")[0];
// var buton1 = new Button("bubu", true, "", allOver, "radio");

//this.groupSuport.classList.remove("check").add("radio");
//group2.setGroupType("radio");
