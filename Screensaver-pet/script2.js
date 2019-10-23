const field = document.querySelector(`svg`);
const warning = document.querySelector(`#warning`);

function setField (){
    field.style.height = window.innerHeight;
    field.style.width = window.innerWidth;
    warning.style.height = window.innerHeight;
    warning.style.width = window.innerWidth;
}

setField();
window.addEventListener(`resize`, setField);
warning.addEventListener(`click`, passWarning);

function drawLine (x1, y1, x2, y2) {
    let line = document.createElement(`line`);
    
    line.setAttribute(`x1`, x1);
    line.setAttribute(`y1`, y1);
    line.setAttribute(`x2`, x2);
    line.setAttribute(`y2`, y2);

    field.append(line);
} 

//force a redraw of parent svg after line children are appended
function forceRefresh(){
    let fieldCurrent = field.innerHTML;
    field.innerHTML = fieldCurrent; 
}

//call drawLine at x, y percentage intervals
function drawLines (lineCount) {
    
    let left = 0;
    let right = 100;
    let top = 0;
    let bottom = 100;

    for (let i = 0; i < (lineCount/2); i++) {
        drawLine(left + `%`, top + `%`, right + `%`, bottom + `%`);
        top += 100 / (lineCount / 2);
        bottom -= 100 / (lineCount / 2); 
    }

    left = 100;
    right = 0;
    top = 0;
    bottom = 100;

    for (let i = 0; i < (lineCount/2); i++) {
        drawLine(left + `%`, top + `%`, right + `%`, bottom + `%`);
        left -= 100 / (lineCount / 2);
        right += 100 / (lineCount / 2); 
    }

    //force redraw
    forceRefresh();

}

//switch the opacity of a line to the opposite of what it was
function strokeSwitch (line) {

    if (lines[line].zeroSwitch) {
        lines[line].style.opacity = `1`;
    }

    else {
        lines[line].style.opacity = `0`;
    }

    lines[line].zeroSwitch = !lines[line].zeroSwitch;

}

//lines switch opacity one after the other
function cascade (lines) {
    
    for (i = 0; i < lines.length; i++) {
        setTimeout(strokeSwitch, 2000-i*5 , i);
    }

}

drawLines(400);
const lines = Array.from(field.querySelectorAll(`line`));

function passWarning () {
    //remove warning when button is clicked
    document.getElementById(`warning`).parentNode.removeChild(document.getElementById(`warning`));
    //start the animation
    setInterval (cascade, 100, lines);
}

// switch background color
let zeroSwitch = true;

setInterval(function(){
    if (zeroSwitch){
        document.getElementById(`canvas`).style.backgroundColor = `rgb(0, 0, 255)`;}
    
    else{
        document.getElementById(`canvas`).style.backgroundColor = `rgb(0, 0, 0)`;
    }

    zeroSwitch = !zeroSwitch
},400);


