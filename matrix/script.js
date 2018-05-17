document.addEventListener("DOMContentLoaded", function() {
    let nrCols = 8, nrLines = 8, elemWidth = 30, elemHeight = 30, hDist = 5, vDist = 5;

    var matrix = document.getElementById('matrix');

    function drawMatrix(colorCLass) {

        var elem = document.createElement("div");
        matrix.appendChild(elem);

        elem.style.width = elemWidth;
        elem.style.height = elemHeight;
        elem.style.marginRight = hDist;
        elem.style.marginBottom = vDist;
        elem.style.display = "inline-block";
        elem.style.position = "static";
        elem.classList.add(colorCLass);
    }

    /* elemente de pe linii pare */

    function liniiPare() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {
                if (i % 2 == 0) {
                    drawMatrix("culoareVerde");
                } else {
                    drawMatrix("culoareRosie");
                }
            }
        }
    }

    //liniiPare();


    /*Diagonala principala*/

    function diagPrinc() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {
                if (i == j) {
                    drawMatrix("culoareBlue");
                } 
                else {
                    drawMatrix("culoareDefault");
                }
            }
        }
    }

    //diagPrinc();

    /*Deasupra Diagonala principala*/

    function overDiagPrinc() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {
                if (j>i) {
                    drawMatrix("culoareBlue");
                } 
                else {
                    drawMatrix("culoareDefault");
                }
            }
        }
    }

    //overDiagPrinc();

    /*Diagonala secundara*/

    function diagSec() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {
                if (i+j==(Math.max(nrCols, nrLines) - 1)) {
                    drawMatrix("culoareBlue");
                } 
                else {
                    drawMatrix("culoareDefault");
                }
            }
        }
    }

    //diagSec();

    function chess() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {
                if ((i + j)%2 == 0) {
                    drawMatrix("culoareBlue");
                } else {
                    drawMatrix("culoareDefalut");
                }
            }
        }
    }
    chess();


/* Position absolute */

    var matabs = document.getElementById('matabs');

    function drawElemAbs(colorCLass, i, j) {

        var elemAbs = document.createElement("div");
        matabs.appendChild(elemAbs);

        elemAbs.style.width = elemWidth;
        elemAbs.style.height = elemHeight;
        elemAbs.id = "s" + i + j;
        elemAbs.style.position = "absolute";
        elemAbs.classList.add(colorCLass);
        return elemAbs;
    }

    function displayMatrixAbs() {
        var xpos, ypos;

        for (i = 0; i < nrLines; i++) {
            for (j = 0; j < nrCols; j++) {
               xpos = (elemWidth + hDist) * j;
               ypos = (elemHeight + vDist) * i;

               eachElem = drawElemAbs("culoareBlue", i, j);
               eachElem.style.top = ypos;
               eachElem.style.left = xpos;
            }
        }
    }
    //displayMatrixAbs();
    
    /* Position absolute - linii pare */

    function liniiPareAbs(i,j) {
        var xpos, ypos;

        for (i = 0; i < nrLines; i++) {
            for (j = 0; j < nrCols; j++) {
               xpos = (elemWidth + hDist) * j;
               ypos = (elemHeight + vDist) * i;           

               if(i%2==0) {
                   eachElem = drawElemAbs("culoareBlue", i, j);
               } else {
                    eachElem = drawElemAbs("culoareVerde", i, j);
               }               
               eachElem.style.top = ypos;
               eachElem.style.left = xpos;
               
            }
        }
    }

   // liniiPareAbs();

   /* Position absolute - diagonala principala*/ 

    /*Diagonala principala*/

    function diagPrincAbs() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {

                xpos = (elemWidth + hDist) * j;
                ypos = (elemHeight + vDist) * i;

                if (i == j) {
                    eachElem = drawElemAbs("culoareBlue", i, j);
                } 
                else {
                    eachElem = drawElemAbs("culoareVerde", i, j);
                }

                eachElem.style.top = ypos;
                eachElem.style.left = xpos;
            }
        }
    }

    //diagPrincAbs();


    /* Position absolute - over diagonala principala */

    function overDiagPrincAbs() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {

                xpos = (elemWidth + hDist) * j;
                ypos = (elemHeight + vDist) * i;

                if (j>i) {
                    eachElem = drawElemAbs("culoareBlue", i, j);
                } 
                else {
                    eachElem = drawElemAbs("culoareVerde", i, j);
                }

                eachElem.style.top = ypos;
                eachElem.style.left = xpos;
            }
        }
    }

    //overDiagPrincAbs();

    /* Position absolute - over diagonala secundara */

    function overDiagSecAbs() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {

                xpos = (elemWidth + hDist) * j;
                ypos = (elemHeight + vDist) * i;

                if (i+j<(Math.max(nrCols, nrLines) - 1)) {
                    eachElem = drawElemAbs("culoareBlue", i, j);
                } 
                else {
                    eachElem = drawElemAbs("culoareVerde", i, j);
                }

                eachElem.style.top = ypos;
                eachElem.style.left = xpos;
            }
        }
    }
    
    //overDiagSecAbs();

    /* Position absolute - tabla de sah */

    function chessAbs() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {

                xpos = (elemWidth + hDist) * j;
                ypos = (elemHeight + vDist) * i;

                if ((i + j)%2 == 0) {
                    eachElem = drawElemAbs("culoareBlue", i, j);
                } 
                else {
                    eachElem = drawElemAbs("culoareVerde", i, j);
                }

                eachElem.style.top = ypos;
                eachElem.style.left = xpos;
            }
        }
    }

    function chessAbsReverse() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {

                xpos = (elemWidth + hDist) * j;
                ypos = (elemHeight + vDist) * i;

                if ((i + j)%2 == 0) {
                    eachElem = drawElemAbs("culoareBlue", i, j);
                } 
                else {
                    eachElem = drawElemAbs("culoareVerde", i, j);
                }

                eachElem.style.top = ypos;
                eachElem.style.left = xpos;
            }
        }
    }
    
    chessAbsReverse();

});

