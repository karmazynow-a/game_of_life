//operations with matrix

var matrixSize = 32;
var startPercent = 50;

var parB = [];
var parS = [];
var matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));
var new_matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));

function updateMatrix(){
    for (var i = 0; i < matrixSize; ++i) {
        for (var j = 0; j < matrixSize; ++j) {
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
            return matrix[1][matrixSize - 1] + matrix[1][0] + matrix[1][1]
                + matrix[0][matrixSize - 1] + matrix[0][1]
                + matrix[matrixSize - 1][matrixSize - 1] + matrix[matrixSize - 1][0] + matrix[matrixSize - 1][1];

        } else if (j == matrixSize - 1) {
            //top right corner
            return matrix[matrixSize - 1][j - 1] + matrix[matrixSize - 1][j] + matrix[matrixSize - 1][0]
                + matrix[0][j - 1] + matrix[0][0]
                + matrix[1][j - 1] + matrix[1][j] + matrix[1][0];

        } else {
            //right
            return matrix[1][j - 1] + matrix[1][j] + matrix[1][j + 1]
                + matrix[0][j - 1] + matrix[0][j + 1]
                + matrix[matrixSize - 1][j - 1] + matrix[matrixSize - 1][j] + matrix[matrixSize - 1][j + 1];
        }
    } else if (i == matrixSize - 1) {
        if (j == 0) {
            //bottom left corner
            return matrix[i - 1][matrixSize - 1] + matrix[i - 1][0] + matrix[i - 1][1]
                + matrix[i][matrixSize - 1] + matrix[i][1]
                + matrix[0][matrixSize - 1] + matrix[0][0] + matrix[0][1];

        } else if (j == matrixSize - 1) {
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
        return matrix[i - 1][matrixSize - 1] + matrix[i][matrixSize - 1] + matrix[i + 1][matrixSize - 1]
            + matrix[i - 1][0] + matrix[i + 1][0]
            + matrix[i - 1][1] + matrix[i][1] + matrix[i + 1][1];

    } else if (j == matrixSize - 1) {
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
    matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));
    for (var i = 0; i < matrixSize; ++i) {
        for (var j = 0; j < matrixSize; ++j) {
            matrix[i][j] = Math.random() < startPercent / 100.0 ? 1 : 0;
        }
    }
}

function paintMatrix() {
    var mat = document.createElement("matrix");

    for (var i = 0; i < matrixSize; ++i) {
        var tr = document.createElement('tr');
        for (var j = 0; j < matrixSize; ++j) {
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
    matrixSize = TESTING ? 10 : Math.floor(window.innerHeight / 7.5);
    matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));
    new_matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));
}