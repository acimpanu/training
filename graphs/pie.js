function Pie(...args) {
    BasicChart.apply(this, args);
    this.type = "Pie";
}

Pie.prototype = new BasicChart();
Pie.prototype.constructor = Pie;

Object.assign(Pie.prototype, {
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
                newSector.textContent = sector.label + " | " + sector.percent + "%";
            g.appendChild(newSector);

            var txt = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                txt.textContent = sector.label + " | " + sector.percent + "%";
                txt.setAttributeNS(null, "fill", "black");
                txt.setAttributeNS(null, "x", "100");
                txt.setAttributeNS(null, "y", "100");
            g.appendChild(txt);
        })
    },

    calcSvgSector: function(data) {
        var sectors = [];
        
        var l = 100; //radius   !!!!! To be changed
        var a = 0; // Angle
        var aRad = 0; // Angle in Rad
        var z = 0; // Size z
        var x = 0; // Side x
        var y = 0; // Side y
        var X = 0; // SVG X coordinate
        var Y = 0; // SVG Y coordinate
        var R = 0; // Rotation

        data.sectors.map(function(item, key) {
            a = 360 * item.percent / 100;
            aCalc = ( a > 180 ) ? 360 - a : a;
            aRad = aCalc * Math.PI / 180;
            z = Math.sqrt( 2*l*l - ( 2*l*l*Math.cos(aRad)));

            if( aCalc <= 90 ) {
                x = l * Math.sin(aRad);
            } else {
                x = l * Math.sin((180 - aCalc) * Math.PI/180 );
            }
            
            y = Math.sqrt( z*z - x*x );
            Y = y;

            if( a <= 180 ) {
                X = l + x;
                arcSweep = 0;
            } else {
                X = l - x;
                arcSweep = 1;
            }

            sectors.push({
                percent: item.percent,
                label: item.label,
                color: colors[key],
                arcSweep: arcSweep,
                L: l,
                X: X,
                Y: Y,
                R: R
            });
            R = R + a;
        })
        return sectors;
    }
})
