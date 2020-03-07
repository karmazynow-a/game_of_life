/** TODO
 * allow to change matrix size
 * CHECK boundary conditions
 */


//initial values
var TESTING = false;

var areBtnsDisabled = false;

var timeInterval = 1000; //in miliseconds
var timer = null;

function onLoad() {
    enableBtns();
    document.getElementById("startPercent").value = startPercent;

    //initial rules
    onChangeRules("B4");
    onChangeRules("S3");

    setMatrixSize();
    onReset();
    return false;
}

//start game
function onStart() {
    disableBtns();
    updatePlot();
    timer = setInterval(nextStep, timeInterval);
    return false;
}

//reset matrix
function onReset() {
    startPercent = Number(document.getElementById("startPercent").value)
    console.log("percent value: " + startPercent)
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
    onReset();
    return false;
}

//do next step of the game
function nextStep() {
    updateMatrix();
    paintMatrix();
    updatePlot();
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
    return false;
}
