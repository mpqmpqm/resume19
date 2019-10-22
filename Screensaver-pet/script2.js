const field = document.querySelector(`svg`);

function setField (){
    field.style.height = window.innerHeight;
    field.style.width = window.innerWidth;
}

setField();
window.addEventListener(`resize`, setField);

function drawLine (x1, y1, x2, y2) {
    let line = document.createElement(`line`);
    
    line.setAttribute(`x1`, x1);
    line.setAttribute(`y1`, y1);
    line.setAttribute(`x2`, x2);
    line.setAttribute(`y2`, y2);

    field.append(line);
} 

function forceRefresh(){
    let fieldCurrent = field.innerHTML;
    field.innerHTML = fieldCurrent; 
}

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

    forceRefresh();

}

function strokeSwitch (line) {

    if (lines[line].zeroSwitch) {
        lines[line].style.opacity = `1`;
    }

    else {
        lines[line].style.opacity = `0`;
    }

    lines[line].zeroSwitch = !lines[line].zeroSwitch;

}

function cascade (lines) {
    

    for (i = 0; i < lines.length; i++) {
        setTimeout(strokeSwitch, 2000 - i * 5, i);
    }

}

drawLines(400);
const lines = Array.from(field.querySelectorAll(`line`));
setInterval (cascade, 100, lines);

setInterval(function(){
    if (document.getElementById(`canvas`).zeroSwitch){
        document.getElementById(`canvas`).style.backgroundColor = `rgb(0, 0, 255)`;}
    
    else{
        document.getElementById(`canvas`).style.backgroundColor = `rgb(0, 0, 0)`;
    }

    document.getElementById(`canvas`).zeroSwitch = !document.getElementById(`canvas`).zeroSwitch
},100);
// cascade (lines);


// setTimeout (cascade, 6000, lines);
