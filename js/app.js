
var matrixSize = 32;
var startPercent = 50;
var parB = [4];
var parS = [3];
var matrix = new Array(matrixSize).fill(0).map(()=> new Array(matrixSize).fill(0));


function onLoad(){
    //initial values
    var areBtnsDisabled = false;
    enableBtns();
    document.getElementById("startPercent").value = startPercent;

    initMatrix();
    paintMatrix();
	return false;
}

//start game
function onStart(){
    disableBtns();
    //every one second (?)
    //make next move
    //  fill matrix
    //  paint matrix
    nextStep();
    paintMatrix();
	return false;
}

//reset matrix
function onReset(){
    startPercent = Number(document.getElementById("startPercent").value)
    console.log("percent value: " + startPercent)
    initMatrix();
    paintMatrix();
	return false;
}

//stop game
function onStop(){
    //stop clock
    //enable buttons
    enableBtns();
	return false;
}

function onChangeRules(rule){
    console.log("new rule " + rule);
    console.log(parS);

    var par = rule[0] == 'S' ? parS : parB;

        if (par.includes(Number(rule[1]))){
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
    

    console.log(parS);

    return false;
}

function nextStep(){

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
    var mat = document.createElement("matrix");
    
    for (var i = 0; i < matrixSize; ++i){
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

function disableBtns(){
    //only stop is enabled - to stop the game
    areBtnsDisabled = true;
    document.getElementById("symStart").disabled = true;
    document.getElementById("symStop").disabled = false;
    document.getElementById("symReset").disabled = true;

    return false;
}

function enableBtns(){
    //only stop is disabled
    areBtnsDisabled = false;
    document.getElementById("symStart").disabled = false;
    document.getElementById("symStop").disabled = true;
    document.getElementById("symReset").disabled = false;
    
    return false;
}
