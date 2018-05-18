document.addEventListener("DOMContentLoaded", function() {
    var nrCols = 8, nrLines = 8, elemWidth = 30, elemHeight = 30, hDist = 5, vDist = 5;

    var matrix = document.getElementById('matrix');

    function drawSquare(colorCLass) {

        var elem = document.createElement("div");
        matrix.appendChild(elem);

        elem.style.width = elemWidth + "px";
        elem.style.height = elemHeight + "px";
        //elem.style.marginRight = hDist + "px";
        //elem.style.marginBottom = vDist + "px";
        elem.style.display = "inline-block";
        elem.style.position = "static";
        elem.classList.add(colorCLass);
    }

    /* elemente de pe linii pare */

    function liniiPare() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {
                if (i % 2 == 0) {
                    drawSquare("culoareVerde");
                } else {
                    drawSquare("culoareRosie");
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
                    drawSquare("culoareBlue");
                } 
                else {
                    drawSquare("culoareDefault");
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
                    drawSquare("culoareBlue");
                } 
                else {
                    drawSquare("culoareDefault");
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
                    drawSquare("culoareBlue");
                } 
                else {
                    drawSquare("culoareDefault");
                }
            }
        }
    }

    //diagSec();

    function chess() {
        for (i = 0; i < nrLines; i++) {
            for ( j= 0; j < nrCols; j++) {
                if ((i + j)%2 == 0) {
                    drawSquare("culoareBlue");
                } else {
                    drawSquare("culoareDefalut");
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

        elemAbs.style.width = elemWidth + "px";
        elemAbs.style.height = elemHeight + "px";
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
               eachElem.style.top = ypos + "px";
               eachElem.style.left = xpos + "px";
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
               eachElem.style.top = ypos + "px";
               eachElem.style.left = xpos + "px";
               
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

                eachElem.style.top = ypos + "px";
                eachElem.style.left = xpos + "px";
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

                eachElem.style.top = ypos + "px";
                eachElem.style.left = xpos + "px";
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

                eachElem.style.top = ypos + "px";
                eachElem.style.left = xpos + "px";
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

                eachElem.style.top = ypos + "px";
                eachElem.style.left = xpos + "px";
            }
        }
    }

    chessAbs();

    function chessAbs() {
        matrix.onclick
    }
    //chessAbsReset();
});

