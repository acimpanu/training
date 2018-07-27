(function app() {
var undoredo = document.getElementById("undoredo");
var clear = document.getElementById("clear");
var drawerase = document.getElementById("radio");

var btn1 = [
    {
        name: "Draw",
        selected: true,
        customStyle: ""
    },
    {
        name: "Erase",
        selected: false,
        customStyle: ""
    },
];

var btn2 = [
    {
        name: "Undo",
        selected: false,
        customStyle: ""
    },
    {
        name: "Redo",
        selected: false,
        customStyle: ""
    },
];

var paint = new Paintscreen(40, 40, document.getElementById("holder"), 5);

var clearBtn = new Button("Clear", false, "", clear, true);
var radioGr = new Group(drawerase, "green", "radio", btn1, true);
var undoredoGr = new Group(undoredo, "pink", "checkbox", btn2, false);

var undoMgr = new UndoManager(30);

var undoBtn = undoredoGr.btns[0].el;
var redoBtn = undoredoGr.btns[1].el;
var drawBtn = radioGr.btns[0];
var eraseBtn = radioGr.btns[1].el;

var clearBtn = clearBtn.el;

radioGr.addListener("change", radioGrChangeHandler);

paint.addListener("draw", handleDraw.bind(this));

undoBtn.addEventListener("click", undopaint);
redoBtn.addEventListener("click", redopaint);
clearBtn.addEventListener("click", resetScreen);

function radioGrChangeHandler() {
    switch (radioGr.getSelectedButtons()[0].name) {
        case "Erase":
            paint.setDrawMode(false);
        break;
        case "Draw":
            paint.setDrawMode(true);
        break;
    }
}

function handleDraw(data) {
    undoMgr.push(data.data);
    enableUndoRedo();
}

function undopaint() {
    var lastChange = undoMgr.undo();
    var arr = [];
    var splitString;
    for (var s in lastChange) {    
        splitString = s.split("-");
        if (lastChange.hasOwnProperty(s)) {
            arr.push({
               x: splitString[0], 
               y: splitString[1],
               state:lastChange[s]
            });
         }
     }
    paint.negatePixels(arr); 
    disableUndo();
}

function redopaint() {
    var lastChange = undoMgr.redo();
    var arr = [];
    var splitString;
     for (var s in lastChange) {    
        splitString = s.split("-");
        if (lastChange.hasOwnProperty(s)) {
            arr.push({
               x: splitString[0],
               y: splitString[1],
               state: lastChange[s]
            });
        }
    }
    paint.repaintPixels(arr);
    disableRedo();
}

function resetScreen() {
    undoMgr.reset();
    paint.clearScreen();
    enableUndoRedo();
}

function enableUndoRedo() {
    if (undoMgr.undoStack.getSize() > 0) {
        undoredoGr.btns[0].setEnable(true);
    } else if (undoMgr.undoStack.getSize() == 0) {
        undoredoGr.btns[0].setEnable(false);
    }
}

function disableUndo() {
    if (undoMgr.undoStack.getSize() == 0) {
        undoredoGr.btns[0].setEnable(false);
        undoredoGr.btns[1].setEnable(true);
    } else {
        undoredoGr.btns[0].setEnable(true);
    }
}

function disableRedo() {
    if (undoMgr.redoStack.getSize() == 0) {
        undoredoGr.btns[1].setEnable(false);
        undoredoGr.btns[0].setEnable(true);
    } else {
        undoredoGr.btns[1].setEnable(true);
    }
}

})();