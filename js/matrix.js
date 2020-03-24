//operations with matrix

var matrixSizeX = 32;
var matrixSizeY = 32;
var startPercent = 20;

var parB = new Array(9).fill(false);
var parS = new Array(9).fill(false);
var matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));

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
    var newMatrix = [];
    
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

function countNeighbours(i, j) {

    function getVal(i, j){
        if (i < 0) tmp_i = matrixSizeX - 1;
        else if (i > matrixSizeX - 1 ) tmp_i = 0;
        else tmp_i = i;

        if (j < 0) tmp_j = matrixSizeY - 1;
        else if (j > matrixSizeY - 1 ) tmp_j = 0;
        else tmp_j = j;

        //console.log("neighbour " + tmp_i + " " + tmp_j + " " + matrix[tmp_i][tmp_j]);
        return matrix[tmp_i][tmp_j];
    }

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
      
    //matrixSizeX = matrixSizeY = 10;
    //matrix = testMatrix;

}

function paintMatrix() {
    var mat = document.createElement("matrix");

    for (var i = 0; i < matrixSizeX; ++i) {
        var tr = document.createElement('tr');
        for (var j = 0; j < matrixSizeY; ++j) {
            var td = document.createElement('td');
            td.className = (matrix[i][j] == 1) ? "cellAlive" : "cellDead";
            tr.appendChild(td);
        }
        mat.appendChild(tr);
    }

    document.getElementById("matrix").innerHTML = mat.innerHTML;

    return false;
}

function sumMatrix() {
    return matrix.reduce(function (a, b) { return a.concat(b) })
        .reduce(function (a, b) { return a + b });
}

function setMatrixSize() {
    matrixSizeX = Number(document.getElementById("matrixW").value);
    matrixSizeY = Number(document.getElementById("matrixH").value);

    if (matrixSizeX < 10){
        console.log("Za mała wartość parametru W!");
        matrixSizeX = 10;
        document.getElementById("matrixW").value = matrixSizeX;
    }
    
    if (matrixSizeX > Math.floor(window.innerHeight / 8)){
        console.log("Za duża wartość parametru! Maksymalna wartość: " + Math.floor(window.innerHeight / 8));
        matrixSizeX = Math.floor(window.innerHeight / 8);
        document.getElementById("matrixW").value = matrixSizeX;
    }

    if (matrixSizeY < 10) {
        console.log("Za mała wartość parametru H!");
        matrixSizeY = 10;
        document.getElementById("matrixH").value = matrixSizeY;
    }

    if (matrixSizeY > Math.floor(window.innerWidth / 13)){
        console.log("Za duża wartość parametru! Maksymalna wartość: " + Math.floor(window.innerWidth / 13));
        matrixSizeY = Math.floor(window.innerWidth / 13);
        document.getElementById("matrixH").value = matrixSizeY;
    }

    matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));

    initMatrix();
    paintMatrix();
}