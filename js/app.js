
var matrixSize = 11;
var startPercent = 50;
var parB = [4];
var parS = [3];
var matrix = new Array(matrixSize).fill(0).map(()=> new Array(matrixSize).fill(0));

function onLoad(){
    initMatrix();
    paintMatrix();
	return false;
}

function initMatrix(){
    matrix = new Array(matrixSize).fill(0).map(()=> new Array(matrixSize).fill(0));
    for (var i = 0; i < matrixSize; ++i){
        for (var j = 0; j < matrixSize; ++j){
            matrix[i][j] = Math.random() < startPercent/100.0 ? 1 : 0;
        }
    }
}

function paintMatrix(){
    var mat = document.getElementById("matrix");
    
    for (var i = 0; i < matrixSize; ++i){
        var tr = document.createElement('tr');
        for (var j = 0; j < matrixSize; ++j) {
            var td = document.createElement('td');
            td.className = matrix[i][j] == 1 ? "cellAlive" : "cellDead";
            tr.appendChild(td);
        }
        mat.appendChild(tr);
    }

	return false;
}
