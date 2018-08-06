var colors = ["#006600", "#009900", "#00cc00", "#00ff00", "#33ff33", "#80ff80", "#b3ffb3", "#e6ffe6"];

var pieSupport = document.getElementById("pie");
var donutSupport = document.getElementById("donut");
var verticalSupport = document.getElementById("vertical");
var horizontalSupport = document.getElementById("horizontal");
var donut2Support = document.getElementById("donut2");

var factory = new chartFactory();

var pie = factory.createChart("Pie", pieSupport, "pieCustomClass");
pie.loadFile("json/chart.json");

var donut = factory.createChart("Donut", donutSupport, "didi");
donut.loadFile("json/chart2.json");

var vertical = factory.createChart("Vertical", verticalSupport, "cici");
vertical.loadFile("json/chart.json");

var horizontal = factory.createChart("Horizontal", horizontalSupport, "myHorizontalCustomClass");
horizontal.loadFile("json/chart.json");
