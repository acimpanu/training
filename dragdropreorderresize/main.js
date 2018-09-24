var holder = document.getElementById("holder");
// marginTop = holder.getBoundingClientRect().top;
// marginLeft = holder.getBoundingClientRect().left;

var positions = ["top", "right", "bottom", "left", "topleft", "topright", "bottomleft", "bottomright"];

var data = [
    {
        width: 500, 
        height: 30, 
        spacing: 30, 
        name: "rect1", 
        resizePoints: ["top", "right", "bottom", "left", "topleft", "topright", "bottomleft", "bottomright"]
    }, 
    {
        width: 400, 
        height: 31, 
        spacing: 31, 
        name: "rect2",
        resizePoints: ["top", "right", "bottom", "left"]
    },
    {
        width: 200, 
        height: 32, 
        spacing: 32, 
        name: "rect3",
        resizePoints: ["topleft", "topright", "bottomright", "bottomleft"]
    }, 
    {
        width: 450, 
        height: 33, 
        spacing: 33, 
        name: "rect4",
        resizePoints: ["top", "bottom"]
    }, 
    {
        width: 400, 
        height: 34, 
        spacing: 34, 
        name: "rect5",
        resizePoints: ["right", "left"]
    }, 
    {
        width: 350, 
        height: 55, 
        spacing: 35, 
        name: "rect6",
        resizePoints: ["right", "bottom", "left", "topleft", "topright", "bottomleft", "bottomright"]
    }];

var drawSvg = new Svgwrapper(holder, 750, 700, data);


