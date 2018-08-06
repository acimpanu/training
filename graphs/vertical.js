function Vertical(...args) {
    BasicChart.apply(this, args);
    this.type = "Vertical";
}

Vertical.prototype = new BasicChart();
Vertical.prototype.constructor = Vertical;

Object.assign(Vertical.prototype, {
    createSvg: function() {
        if (!this.dataLoaded) {
            this.requestedRender = true;
            return;
        }
        var vSvg;
        
        vSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            vSvg.setAttribute("width", "50");
            vSvg.setAttribute("height", "200");
            vSvg.setAttribute("id", "verticalsvg");
            vSvg.setAttribute("class", this.customClass);
        this.parent.appendChild(vSvg);

        sectors = this.calcSvgSector(this.data);

        sectors.map( function(sector) {
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                vSvg.appendChild(g);

            var rectSector = document.createElementNS( "http://www.w3.org/2000/svg","rect");
                rectSector.setAttributeNS(null, "fill", sector.color);
                rectSector.setAttributeNS(null, "width", "100%");
                rectSector.setAttributeNS(null, "height", sector.H);
                rectSector.setAttributeNS(null, "y", sector.Y);
                rectSector.setAttributeNS(null, "x", "0");
            g.appendChild(rectSector);

            var txt = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                txt.textContent = sector.label + " | " + sector.percent + "%"
            g.appendChild(txt);
        })
    },

    calcSvgSector: function(data) {
        var sectors = [];
        var h = 200;
        var ys = [];
        var Y;
        var result = [];
        var heights = [];


        data.sectors.map(function(item, key) {
            heights.push(h * item.percent / 100);
            
            if (key == 0) {
                ys.push(0);
                result[key] = 0;
            } else if (key > 0) {
                ys.push(heights[key-1]);
                result[key] = result[key-1] + ys[key];
            }

            sectors.push({
                percent: item.percent,
                label: item.label,
                color: colors[key],
                H: h * item.percent / 100,
                Y: result[key]
            });
        })
        
        return sectors;
    }
})
