function Donut(...args) {
    BasicChart.apply(this, args);
    this.type = "Donut";
}

Donut.prototype = new BasicChart();
Donut.prototype.constructor = Donut;

Object.assign(Donut.prototype, {
    createSvg: function() {
        if (!this.dataLoaded) {
            this.requestedRender = true;
            return;
        }
        var dSvg;

        sectors = this.calcSvgSector(this.data);

        sectors.map( function(sector) {
            dSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                dSvg.setAttribute("width", sector.L / 2);
                dSvg.setAttribute("height", sector.L / 2);
                dSvg.setAttributeNS(null, "viewport", "0 0 " + sector.L / 2 + " " + sector.L / 2);
                dSvg.setAttributeNS(null, "stroke", "darkgrey");
                dSvg.setAttribute("class", this.customClass);
            donutSupport.appendChild(dSvg);

            var suport = document.createElementNS( "http://www.w3.org/2000/svg","path");
                suport.setAttribute("width", sector.L / 2);
                suport.setAttribute("height", sector.L / 2);
                suport.setAttributeNS(null, "fill", "none");
                suport.setAttributeNS(null, "class", "dark-circle");
                suport.setAttributeNS(null, "d", "M " + sector.L / 4 + " " + (sector.L / 2 - sector.d) / 2 + " a "+ sector.R + " " + sector.R + " 0 0 1 0 " + sector.d + " a "+ sector.R + " " + sector.R + " 0 0 1 0 -" + sector.d);
            dSvg.appendChild(suport);

            var newSector = document.createElementNS( "http://www.w3.org/2000/svg","path");
                newSector.setAttributeNS(null, "fill", "none");
                newSector.setAttribute("width", sector.L / 2);
                newSector.setAttribute("height", sector.L / 2);
                newSector.setAttributeNS(null, "d", "M " + sector.L / 4 + " " + (sector.L / 2 - sector.d) / 2 + " a "+ sector.R + " " + sector.R + " 0 0 1 0 " + sector.d);
                newSector.setAttributeNS(null, "stroke", sector.color);
                newSector.setAttributeNS(null, "class", "circle");
                newSector.setAttributeNS(null, "text", sector.label);
                newSector.setAttributeNS(null, "stroke-dasharray", sector.percent + ", 100");
                newSector.setAttributeNS(null, "title", sector.label);
                newSector.setAttributeNS(null, "text", sector.label);
                newSector.textContent = sector.label + " | " + sector.percent + "%";
            dSvg.appendChild(newSector);

            var txt = document.createElementNS( "http://www.w3.org/2000/svg","text");
                txt.textContent = sector.percent + "%";
                txt.setAttributeNS(null, "x", sector.L/4 - 10);
                txt.setAttributeNS(null, "y", sector.L/4 + 5);
            dSvg.appendChild(txt);

            var txt2 = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                txt2.textContent = sector.label + " | " + sector.percent + "%";
            dSvg.appendChild(txt2);
        })
    },

    calcSvgSector: function(data) {
        var sectors = [];
        var l = 200;
        var diam;

        data.sectors.map(function(item, key) {
            radius = l / (3.14159 * 2);
            diam = radius * 2;

            sectors.push({
                percent: item.percent,
                label: item.label,
                color: colors[key],
                R: radius,
                d: diam,
                d2:-diam,
                L: l
            });
        })
        return sectors;
    }
})
