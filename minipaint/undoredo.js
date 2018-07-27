function UndoManager(size) {
	this.undoStack = new Stack(size);
    this.redoStack = new Stack(size);
}

UndoManager.prototype.push = function (data) {
	this.undoStack.push(data);
    this.clearRedo();
};

UndoManager.prototype.undo = function () {
    var modif = this.undoStack.pop();
    if (modif) {
        this.redoStack.push(modif);
    } else {
        return false;
    }
    return modif;
};

UndoManager.prototype.redo = function () {
	var modif = this.redoStack.pop();
    if (modif) {
	    this.undoStack.push(modif);
    } else {
        return false;
    }
    return modif;
};

UndoManager.prototype.reset = function () {
	this.undoStack.clear();
    this.redoStack.clear();
};

UndoManager.prototype.clearRedo = function () {
    this.redoStack.clear();
};

UndoManager.prototype.isUndoEmpty = function () {
    this.undoStack.isEmpty();
};

UndoManager.prototype.isRedoEmpty = function () {
    this.redoStack.isEmpty();
};