//operations with matrix

var matrixSizeX = 32;
var matrixSizeY = 32;
var startPercent = 20;

var parB = new Array(9).fill(false);
var parS = new Array(9).fill(false);
var matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));
var newMatrix = [];

const deadColor = "white";
const aliveColor = "#383a40";
const strokeColor = "#989ead";
const cellSize = 10;

testMatrix = [
    [1,0,0,1,1,0,1,0,1,0],
    [1,1,0,0,1,0,0,1,1,0],
    [0,0,1,1,1,1,0,1,0,1],
    [1,1,1,1,1,0,1,0,1,1],
    [0,1,0,1,1,0,0,0,1,0],
    [1,0,1,0,0,1,1,1,0,1],
    [0,1,1,1,0,1,0,0,0,0],
    [1,0,0,1,1,0,0,0,1,0],
    [0,0,1,1,1,1,1,1,1,0],
    [1,1,1,0,0,1,0,1,0,1]
]

function updateMatrix() {
    newMatrix = [];
    
    for (var i = 0; i < matrixSizeX; ++i) {
        newMatrix[i] = [];
        for (var j = 0; j < matrixSizeY; ++j) {
            count = countNeighbours(i, j);
            
            if (matrix[i][j] == 1) {
                //is alive - can stay
                newMatrix[i][j] = parS[count] ? 1 : 0;
            } else {
                //is dead - can be born
                newMatrix[i][j] = parB[count] ? 1 : 0;
            }
        }
    }
    
    matrix = newMatrix;
}

function getVal(i, j){
    if (i < 0) tmp_i = matrixSizeX - 1;
    else if (i > matrixSizeX - 1 ) tmp_i = 0;
    else tmp_i = i;

    if (j < 0) tmp_j = matrixSizeY - 1;
    else if (j > matrixSizeY - 1 ) tmp_j = 0;
    else tmp_j = j;

    return matrix[tmp_i][tmp_j];
}

function countNeighbours(i, j) {
    return  getVal(i-1, j-1) + getVal(i-1, j) + getVal(i-1, j+1) +
            getVal(i, j-1) + getVal(i, j+1) +
            getVal(i+1, j-1) + getVal(i+1, j) + getVal(i+1, j+1);
}

function initMatrix() {
    matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));
    for (var i = 0; i < matrixSizeX; ++i) {
        for (var j = 0; j < matrixSizeY; ++j) {
            matrix[i][j] = Math.random() < startPercent / 100.0 ? 1 : 0;
        }
    }
}

function paintMatrix() {
    const drawBoard = (ctx, step) => {
	for (var i = 0; i < matrixSizeX; ++i) {
    	    for (var j = 0; j < matrixSizeY; ++j) {
      		ctx.fillStyle = (matrix[i][j] == 1) ? aliveColor : deadColor;
      		ctx.fillRect(j * step, i * step, step, step);

	        ctx.beginPath();
      		ctx.strokeStyle = strokeColor;
      		ctx.strokeRect(j * step, i * step, step, step);
      		ctx.closePath();
    	    }
        }
    };
    const c = document.getElementById('matrix');

    c.height = cellSize * matrixSizeX;
    c.width = cellSize * matrixSizeY;
    const ctx = c.getContext("2d");

    drawBoard(ctx, cellSize);
}

function sumMatrix() {
    return matrix.reduce(function (a, b) { return a.concat(b) })
        .reduce(function (a, b) { return a + b });
}

//proportions matrix to window size
divideX = 12;
divideY = 25;

function setMatrixSize() {
    matrixSizeX = Number(document.getElementById("matrixW").value);
    matrixSizeY = Number(document.getElementById("matrixH").value);
    maxX = Math.floor(window.innerHeight / divideX);
    maxY = Math.floor(window.innerWidth / divideY);

    if (matrixSizeX < 10){
        console.log("Za mała wartość parametru W!");
        matrixSizeX = 10;
        document.getElementById("matrixW").value = matrixSizeX;
    }
    
    if (matrixSizeX > maxX){
        console.log("Za duża wartość parametru! Maksymalna wartość: " + maxX);
        matrixSizeX = maxX;
        document.getElementById("matrixW").value = matrixSizeX;
    }

    if (matrixSizeY < 10) {
        console.log("Za mała wartość parametru H!");
        matrixSizeY = 10;
        document.getElementById("matrixH").value = matrixSizeY;
    }

    if (matrixSizeY > maxY){
        console.log("Za duża wartość parametru! Maksymalna wartość: " + maxY);
        matrixSizeY = maxY;
        document.getElementById("matrixH").value = matrixSizeY;
    }

    matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));

    initMatrix();
    paintMatrix();
}
