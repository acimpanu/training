function BasicChart(parent, customClass, file) {
    this.customClass = customClass;
    this.parent = parent;
    this.file = file;
    this.dataLoaded = false;
    this.requestedRender = false;
}

BasicChart.prototype.constructor = BasicChart;
Object.assign(BasicChart.prototype, {
    loadFile: function(file) {
        this.file = file;
        this.readTextFile(file, this.callback);
    },

    readTextFile: function(file, callback) {
        var rawFile = new XMLHttpRequest();
        var that = this;
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", this.file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback.call(that, rawFile.responseText);
                that.createSvg();
            }
        }
        rawFile.send(null);
    },

    callback: function(text) {
        this.dataLoaded = true;
        this.data = JSON.parse(text);
        if (this.requestedRender) {
            this.createSvg();
        }
        this.appendLegend();
    },

    createSvg: function() {
        throw("............this must be overrriden");
    }, 

    calcSvgSector: function() {
        throw("............this must be overrriden");
    },

    appendLegend: function() {
        sectors = this.createContent(this.data);

        this.sectorHeight = sectors.length * sectors.Y;

        legendSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            legendSvg.setAttribute("width", "250");
            legendSvg.setAttribute("height", "200");
            legendSvg.setAttribute("class", "legendsvg");
        this.parent.appendChild(legendSvg);

        sectors.map(function(sector) {
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                legendSvg.appendChild(g);

            var rect = document.createElementNS( "http://www.w3.org/2000/svg","rect");
                rect.setAttributeNS(null, "fill", sector.color);
                rect.setAttributeNS(null, "width", "50");
                rect.setAttributeNS(null, "height", "20");
                rect.setAttributeNS(null, "x", "0");
                rect.setAttributeNS(null, "y", sector.Y);
            g.appendChild(rect);

            var txtLeg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                txtLeg.textContent = sector.label;
                txtLeg.setAttributeNS(null, "fill", "black");
                txtLeg.setAttributeNS(null, "width", "50");
                txtLeg.setAttributeNS(null, "height", "20");
                txtLeg.setAttributeNS(null, "x", "55");
                txtLeg.setAttributeNS(null, "y", sector.Y + 13);
                txtLeg.setAttributeNS(null, "style", "font-family: arial; font-size: 12px;");
            g.appendChild(txtLeg);
        })
    },

    createContent: function(data) {
        var sectors = [];
        var space = 25;

        data.sectors.map(function(item, key) {
            sectors.push({
                percent: item.percent,
                label: item.label,
                color: colors[key],
                Y: key * space
            })
        })
        return sectors;
    }
})

