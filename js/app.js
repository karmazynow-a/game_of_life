/** TODO
 * axis - names and arrows and ticks with values
 * change matrix size on window size change
 * warunki brzegowe
 */


//initial values
var TESTING = false;

var areBtnsDisabled = false;

var matrixSize = 32;
var startPercent = 50;

var parB = [];
var parS = [];
var matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));
var new_matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));

var timeInterval = 1000; //in miliseconds
var timer = null;

var canvasHeight;
var canvasWidth;
var xAxis;

function onLoad() {
    enableBtns();
    document.getElementById("startPercent").value = startPercent;

    //initial rules
    onChangeRules("B6");
    onChangeRules("S3");

    setMatrixSize();
    onReset();
    return false;
}

//start game
function onStart() {
    disableBtns();
    timer = setInterval(nextStep, timeInterval);
    return false;
}

//reset matrix
function onReset() {
    startPercent = Number(document.getElementById("startPercent").value)
    console.log("percent value: " + startPercent)
    xAxis = 0;
    paintPlot();
    initMatrix();
    paintMatrix();
    return false;
}

//stop game
function onStop() {
    clearInterval(timer);
    enableBtns();
    return false;
}

//change rules of the game
function onChangeRules(rule) {
    console.log("New rule " + rule);

    var par = rule[0] == 'S' ? parS : parB;

    if (par.includes(Number(rule[1]))) {
        //remove rule
        var index = par.indexOf(Number(rule[1]));
        if (index !== -1) par.splice(index, 1);

        //pop button
        document.getElementById(rule).style.backgroundColor = "#989ead"
    }
    else {
        par.push(Number(rule[1]));

        //push button
        document.getElementById(rule).style.backgroundColor = "#595d66"
    }

    console.log("Rules are " + parS + " & " + parB);
    return false;
}

function onWindowResize() {
    setMatrixSize();
    initMatrix();
}

//do next step of the game
function nextStep() {
    //TODO warunki brzegowe

    for (var i = 1; i < matrixSize - 1; ++i) {
        for (var j = 1; j < matrixSize - 1; ++j) {
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
    paintMatrix();
    updatePlot();
}

function countNeighbours(i, j) {
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

function sumMatrix(){
    return matrix.reduce(function(a,b) { return a.concat(b) })
            .reduce(function(a,b) { return a + b });
}

function setMatrixSize() {
    matrixSize = TESTING ? 10 : Math.floor(window.innerHeight / 7.5);
    matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));
    new_matrix = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill(0));
}

function paintPlot() {
    var canvas = document.getElementById("plotCanvas");
    var ctx = canvas.getContext("2d");

    ctx.canvas.width = Math.floor(window.innerWidth / 2.0);
    ctx.canvas.height = Math.floor(window.innerHeight / 5.0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    //make X axis
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#595d66";
    ctx.moveTo(5, canvasHeight - 5);
    ctx.lineTo(canvasWidth - 5, canvasHeight - 5);
    ctx.stroke();

    //make Y axis
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(5, 5);
    ctx.lineTo(5, canvasHeight - 5);
    ctx.stroke();
}

function updatePlot(){
    if (xAxis == canvasWidth - 11){
        paintPlot();
        xAxis = 0;
    }
    xAxis++;
    console.log(sumMatrix());
    var yAxis = ( (canvasHeight - 12) * sumMatrix()) / (matrixSize**2);
    var canvas = document.getElementById("plotCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillRect(6 + xAxis, canvasHeight - 6 - yAxis, 1, 1);
}

function disableBtns() {
    //only stop is enabled - to stop the game
    areBtnsDisabled = true;
    document.getElementById("symStart").disabled = true;
    document.getElementById("symStop").disabled = false;
    document.getElementById("symReset").disabled = true;

    document.getElementById("S2").disabled = true;
    document.getElementById("S3").disabled = true;
    document.getElementById("S6").disabled = true;
    document.getElementById("S8").disabled = true;

    document.getElementById("B2").disabled = true;
    document.getElementById("B3").disabled = true;
    document.getElementById("B6").disabled = true;
    document.getElementById("B8").disabled = true;

    document.getElementById("startPercent").disabled = true;
    return false;
}

function enableBtns() {
    //only stop is disabled
    areBtnsDisabled = false;
    document.getElementById("symStart").disabled = false;
    document.getElementById("symStop").disabled = true;
    document.getElementById("symReset").disabled = false;

    document.getElementById("S2").disabled = false;
    document.getElementById("S3").disabled = false;
    document.getElementById("S6").disabled = false;
    document.getElementById("S8").disabled = false;

    document.getElementById("B2").disabled = false;
    document.getElementById("B3").disabled = false;
    document.getElementById("B6").disabled = false;
    document.getElementById("B8").disabled = false;

    document.getElementById("startPercent").disabled = false;
    return false;
}
