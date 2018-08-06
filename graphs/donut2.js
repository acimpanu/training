function Donut2(...args) {
    BasicChart.apply(this, args);
    this.type = "Donut2";
}

Donut2.prototype = new BasicChart();
Donut2.prototype = new Pie();
Donut2.prototype.constructor = Donut2;

Object.assign(Donut2.prototype, {
    createSvg: function() {
        if (!this.dataLoaded) {
            this.requestedRender = true;
            return;
        }
        var aSvg;
        var g;
        
        aSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            aSvg.setAttribute("width", "200");
            aSvg.setAttribute("height", "200");
            aSvg.setAttribute("id", "piesvg");
            aSvg.setAttribute("class", this.customClass);
        this.parent.appendChild(aSvg);

        sectors = this.calcSvgSector(this.data);

        sectors.map( function(sector) {
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                aSvg.appendChild(g);

            var newSector = document.createElementNS( "http://www.w3.org/2000/svg","path");
                newSector.setAttributeNS(null, "fill", sector.color);
                newSector.setAttributeNS(null, "d", "M" + sector.L + "," + sector.L + " L" + sector.L + ",0 A" + sector.L + "," + sector.L + " 1 0,1 " + sector.X + ", " + sector.Y + " z");
                newSector.setAttributeNS(null, "transform", "rotate(" + sector.R + ", "+ sector.L+", "+ sector.L+")");
                newSector.setAttributeNS(null, "title", sector.label);
                newSector.setAttributeNS(null, "text", sector.label);
                newSector.textContent = sector.label;
            g.appendChild(newSector);

            var txt = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                txt.textContent = sector.label;
                txt.setAttributeNS(null, "fill", "black");
                txt.setAttributeNS(null, "x", "100");
                txt.setAttributeNS(null, "y", "100");
            g.appendChild(txt);
        })

        var midCircle = document.createElementNS( "http://www.w3.org/2000/svg","circle" );
            midCircle.setAttributeNS(null, 'cx', sector.size * 0.5 );
            midCircle.setAttributeNS(null, 'cy', sector.size * 0.5);
            midCircle.setAttributeNS(null, 'r', sector.size * 0.28 );
            midCircle.setAttributeNS(null, 'fill', '#42495B' );

        aSvg.appendChild(midCircle);
    }
})
