
//initial values
var areBtnsDisabled = false;
var paramsChanged = false;
var continueAnimating = false;

var timeInterval = 200; //in miliseconds
var timer = null;

function onLoad() {
    enableBtns();

    document.getElementById('symStop').addEventListener('click',onStop);

    document.getElementById("startPercent").value = startPercent;
    onSliderChange();

    //initial rules
    onChangeRules("B3");
    onChangeRules("S3");
    onChangeRules("S2");

    document.getElementById("matrixH").value = Math.floor(window.innerHeight / 8);
    document.getElementById("matrixW").value = Math.floor(window.innerWidth / 13);
    setMatrixSize();
    onReset();
    return false;
}

//start game
function onStart() {
    continueAnimating = true;
    if(paramsChanged){
        onReset();
        paramsChanged = false;
    }
    disableBtns();
    updatePlot();
    timer = setInterval(nextStep, timeInterval);
    return false;
}

//reset matrix
function onReset() {
    paintPlot();
    initMatrix();
    paintMatrix();
    return false;
}

//stop game
function onStop() {
    continueAnimating = false;
    clearInterval(timer);
    enableBtns();
    return false;
}

function onSliderChange() {
    startPercent = Number(document.getElementById("startPercent").value);
    document.getElementById("rangeValue").innerHTML = startPercent + "%";
    paramsChanged = true;
    initMatrix();
    paintMatrix();
}

//change rules of the game
function onChangeRules(rule) {
    console.log("New rule " + rule);

    var par = rule[0] == 'S' ? parS : parB;

    par[Number(rule[1])] = par[Number(rule[1])] ? false : true;
    par[Number(rule[1])] ?
            //push button
            document.getElementById(rule).style.backgroundColor = "#595d66"
            :
            //pop button
            document.getElementById(rule).style.backgroundColor = "#989ead";


    console.log("Rules are B "+ parB + " & S: " + parS);
    paramsChanged = true;
    return false; 
}

//do next step of the game
function nextStep() {
    if (continueAnimating) {
	setTimeout(updateMatrix, 10);
        setTimeout(paintMatrix, 10);
	setTimeout(updatePlot, 10);
    }
}

function onWindowResize() {
    setMatrixSize();
    initMatrix();
}

function disableBtns() {
    //only stop is enabled - to stop the game
    areBtnsDisabled = true;
    document.getElementById("symStart").disabled = true;
    document.getElementById("symStop").disabled = false;
    document.getElementById("symReset").disabled = true;

    document.getElementById("S0").disabled = true;
    document.getElementById("S1").disabled = true;
    document.getElementById("S2").disabled = true;
    document.getElementById("S3").disabled = true;
    document.getElementById("S4").disabled = true;
    document.getElementById("S5").disabled = true;
    document.getElementById("S6").disabled = true;
    document.getElementById("S7").disabled = true;
    document.getElementById("S8").disabled = true;

    document.getElementById("B0").disabled = true;
    document.getElementById("B1").disabled = true;
    document.getElementById("B2").disabled = true;
    document.getElementById("B3").disabled = true;
    document.getElementById("B4").disabled = true;
    document.getElementById("B5").disabled = true;
    document.getElementById("B6").disabled = true;
    document.getElementById("B7").disabled = true;
    document.getElementById("B8").disabled = true;

    document.getElementById("startPercent").disabled = true;

    document.getElementById("matrixW").disabled = true;
    document.getElementById("matrixH").disabled = true;
    return false;
}

function enableBtns() {
    //only stop is disabled
    areBtnsDisabled = false;
    document.getElementById("symStart").disabled = false;
    document.getElementById("symStop").disabled = true;
    document.getElementById("symReset").disabled = false;

    document.getElementById("S0").disabled = false;
    document.getElementById("S1").disabled = false;
    document.getElementById("S2").disabled = false;
    document.getElementById("S3").disabled = false;
    document.getElementById("S4").disabled = false;
    document.getElementById("S5").disabled = false;
    document.getElementById("S6").disabled = false;
    document.getElementById("S7").disabled = false;
    document.getElementById("S8").disabled = false;

    document.getElementById("B0").disabled = false;
    document.getElementById("B1").disabled = false;
    document.getElementById("B2").disabled = false;
    document.getElementById("B3").disabled = false;
    document.getElementById("B4").disabled = false;
    document.getElementById("B5").disabled = false;
    document.getElementById("B6").disabled = false;
    document.getElementById("B7").disabled = false;
    document.getElementById("B8").disabled = false;

    document.getElementById("startPercent").disabled = false;
    document.getElementById("matrixW").disabled = false;
    document.getElementById("matrixH").disabled = false;
    return false;
}
