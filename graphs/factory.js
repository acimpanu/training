function chartFactory() {
    this.createChart = function (type, parent, customClass, file) {
        var chart;
 
        if (type.toLowerCase() === "pie") {
            chart = new Pie(parent, customClass, file);
        } else if (type.toLowerCase() === "donut") {
            chart = new Donut(parent, customClass, file);
        } else if (type.toLowerCase() === "vertical") {
            chart = new Vertical(parent, customClass, file);
        } else if (type.toLowerCase() === "horizontal") {
            chart = new Horizontal(parent, customClass, file);
        } else if (type.toLowerCase() === "donut2") {
            chart = new Donut2(parent, customClass, file);
        }

        chart.printType = function () {
            console.log("This chart type is:", chart.type);
        }

        return chart;
    }
}
