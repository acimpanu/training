function Horizontal(...args) {
    BasicChart.apply(this, args);
    this.type = "Horizontal";
}

//Horizontal.prototype = new BasicChart();
Horizontal.prototype = new Vertical();
Horizontal.prototype.constructor = Horizontal;

Object.assign(Horizontal.prototype, {
    createSvg: function() {
        if (!this.dataLoaded) {
            this.requestedRender = true;
            return;
        }
        var hSvg;
        
        hSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            hSvg.setAttribute("height", "20");
            hSvg.setAttribute("id", "horizontalsvg");
            hSvg.setAttribute("class", this.customClass);
        this.parent.appendChild(hSvg);

        sectors = this.calcSvgSector(this.data);

        sectors.map( function(sector) {
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                hSvg.appendChild(g);

            var rectSector = document.createElementNS( "http://www.w3.org/2000/svg","rect");
                rectSector.setAttributeNS(null, "fill", sector.color);
                rectSector.setAttributeNS(null, "height", "100%");
                rectSector.setAttributeNS(null, "width", sector.H);
                rectSector.setAttributeNS(null, "x", sector.Y);
                rectSector.setAttributeNS(null, "y", "0");
                rectSector.setAttributeNS(null, "title", sector.label);
                rectSector.setAttributeNS(null, "text", sector.label);
                rectSector.textContent = sector.label;
            g.appendChild(rectSector);

            var txt2 = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                txt2.textContent = sector.label + " | " + sector.percent + "%";
            g.appendChild(txt2);
        })
    }
})
