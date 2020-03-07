//operations with matrix

var matrixSizeX = 32;
var matrixSizeY = 32;
var startPercent = 50;

var parB = [];
var parS = [];
var matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));
var new_matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));

function updateMatrix(){
    for (var i = 0; i < matrixSizeX; ++i) {
        for (var j = 0; j < matrixSizeY; ++j) {
            if (matrix[i][j] == 1) {
                //is alive
                new_matrix[i][j] = parS.includes(countNeighbours(i, j)) ? 1 : 0;
            }
            else {
                //is dead
                new_matrix[i][j] = parB.includes(countNeighbours(i, j)) ? 1 : 0;
            }
        }
    }

    matrix = new_matrix;
}

function countNeighbours(i, j) {
    if (i == 0) {
        if (j == 0) {
            //top left corner
            return matrix[1][matrixSizeY - 1] + matrix[1][0] + matrix[1][1]
                + matrix[0][matrixSizeY - 1] + matrix[0][1]
                + matrix[matrixSizeX - 1][matrixSizeY - 1] + matrix[matrixSizeX - 1][0] + matrix[matrixSizeX - 1][1];

        } else if (j == matrixSizeY - 1) {
            //top right corner
            return matrix[matrixSizeX - 1][j - 1] + matrix[matrixSizeX - 1][j] + matrix[matrixSizeX - 1][0]
                + matrix[0][j - 1] + matrix[0][0]
                + matrix[1][j - 1] + matrix[1][j] + matrix[1][0];

        } else {
            //right
            return matrix[1][j - 1] + matrix[1][j] + matrix[1][j + 1]
                + matrix[0][j - 1] + matrix[0][j + 1]
                + matrix[matrixSizeX - 1][j - 1] + matrix[matrixSizeX - 1][j] + matrix[matrixSizeX - 1][j + 1];
        }
    } else if (i == matrixSizeX - 1) {
        if (j == 0) {
            //bottom left corner
            return matrix[i - 1][matrixSizeY - 1] + matrix[i - 1][0] + matrix[i - 1][1]
                + matrix[i][matrixSizeY - 1] + matrix[i][1]
                + matrix[0][matrixSizeY - 1] + matrix[0][0] + matrix[0][1];

        } else if (j == matrixSizeY - 1) {
            //bottom right corner
            return matrix[i - 1][j - 1] + matrix[i - 1][j] + matrix[i - 1][0]
                + matrix[i][j - 1] + matrix[i][0]
                + matrix[0][j - 1] + matrix[0][j] + matrix[0][0];

        } else {
            //bottom
            return matrix[0][j - 1] + matrix[0][j] + matrix[0][j + 1]
                + matrix[i][j - 1] + matrix[i][j + 1]
                + matrix[i - 1][j - 1] + matrix[i - 1][j] + matrix[i - 1][j + 1];
        }
    } else if (j == 0) {
        //left
        return matrix[i - 1][matrixSizeY - 1] + matrix[i][matrixSizeY - 1] + matrix[i + 1][matrixSizeY - 1]
            + matrix[i - 1][0] + matrix[i + 1][0]
            + matrix[i - 1][1] + matrix[i][1] + matrix[i + 1][1];

    } else if (j == matrixSizeY - 1) {
        //right
        return matrix[i - 1][j - 1] + matrix[i][j - 1] + matrix[i + 1][j - 1]
            + matrix[i - 1][j] + matrix[i + 1][j]
            + matrix[i - 1][0] + matrix[i][0] + matrix[i + 1][0];
    }

    return matrix[i - 1][j - 1] + matrix[i - 1][j] + matrix[i - 1][j + 1] +
        matrix[i][j - 1] + matrix[i][j + 1] +
        matrix[i + 1][j - 1] + matrix[i + 1][j] + matrix[i + 1][j + 1];
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
    var mat = document.createElement("matrix");

    for (var i = 0; i < matrixSizeX; ++i) {
        var tr = document.createElement('tr');
        for (var j = 0; j < matrixSizeY; ++j) {
            var td = document.createElement('td');
            td.className = matrix[i][j] == 1 ? "cellAlive" : "cellDead";
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
    matrixSizeX = Number(document.getElementById("matrixH").value);
    matrixSizeY = Number(document.getElementById("matrixW").value);

    if (matrixSizeY < 10) {
        console.log("Za mała wartość parametru!");
        matrixSizeY = 10;
        document.getElementById("matrixH").value = matrixSizeY;
    }

    if (matrixSizeY > Math.floor(window.innerWidth / 13)){
        console.log("Za duża wartość parametru! Maksymalna wartość: " + Math.floor(window.innerWidth / 13));
        matrixSizeY = Math.floor(window.innerWidth / 13);
        document.getElementById("matrixH").value = matrixSizeY;
    }

    if (matrixSizeX < 10){
        console.log("Za mała wartość parametru!");
        matrixSizeX = 10;
        document.getElementById("matrixW").value = matrixSizeX;
    }
    
    if (matrixSizeX > Math.floor(window.innerHeight / 8)){
        console.log("Za duża wartość parametru! Maksymalna wartość: " + Math.floor(window.innerHeight / 8));
        matrixSizeX = Math.floor(window.innerHeight / 8);
        document.getElementById("matrixW").value = matrixSizeX;
    }

    matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));
    new_matrix = new Array(matrixSizeX).fill(0).map(() => new Array(matrixSizeY).fill(0));

    initMatrix();
    paintMatrix();
}