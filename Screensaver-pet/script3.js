const field = document.querySelector(`svg`);
// const warningButton = document.querySelector(`button`);

function setField() {
    field.style.height = window.innerHeight;
    field.style.width = window.innerWidth;
    // warning.style.height = window.innerHeight;
    // warning.style.width = window.innerWidth;
}

setField();
window.addEventListener(`resize`, setField);
// warningButton.addEventListener(`click`, passWarning);

//svg lines are drawn from (x1, y1) to (x2, y2)
function drawLine(x1, y1, x2, y2) {
    let line = document.createElement(`line`);

    line.setAttribute(`x1`, x1);
    line.setAttribute(`y1`, y1);
    line.setAttribute(`x2`, x2);
    line.setAttribute(`y2`, y2);

    field.append(line);
}

//force a redraw of parent svg after line children are appended
function forceRefresh() {
    let fieldCurrent = field.innerHTML;
    field.innerHTML = fieldCurrent;
}

//call drawLine at x, y percentage intervals
function drawLines(lineCount) {

    let left = 0;
    let right = 100;
    let top = 0;
    let bottom = 100;

    for (let i = 0; i < (lineCount / 2); i++) {
        drawLine(left + `%`, top + `%`, right + `%`, bottom + `%`);
        top += 100 / (lineCount / 2);
        bottom -= 100 / (lineCount / 2);
    }

    left = 100;
    right = 0;
    top = 0;
    bottom = 100;

    for (let i = 0; i < (lineCount / 2); i++) {
        drawLine(left + `%`, top + `%`, right + `%`, bottom + `%`);
        left -= 100 / (lineCount / 2);
        right += 100 / (lineCount / 2);
    }

    //force redraw
    forceRefresh();

}

//switch the opacity of a line to the opposite of what it was
function strokeSwitch(line, zeroSwitch) {

    if (zeroSwitch) {
        lines[line].style.opacity = `1`;
    } else {
        lines[line].style.opacity = `0`;
    }

}

//track last operation on opacity, without accessing properties of individual lines.
let zeroSwitch = true;
//lines switch opacity one after the other
function cascade(lines) {

    //schedule lines.length calls of strokeSwitch. Each call will execute 5ms after the previous. Starting with a 2s delay and working down makes the effect go clockwise, which I prefer.
    for (i = 0; i < lines.length; i++) {
        setTimeout(strokeSwitch, 2000 - i * 5, i, zeroSwitch);
    }
    //schedule the opposite effect for the next call of this function
    zeroSwitch = !zeroSwitch;
}

drawLines(400);
const lines = Array.from(field.querySelectorAll(`line`));
// let i = 0;

function opacityStart() {
    for (let e = 0; e < lines.length; e += 40) {
        for (let i = e; i < e + 20; i++) {
            lines[i].style.opacity = `1`;
        }
    }
}

function opacityReset () {
    for (let e = 0; e < lines.length; e += 40) {
        for (let i = e; i < e + 20; i++) {
            lines[i].style.opacity = `1`;
        }
    }
    for (let e = 20; e < lines.length; e +=40) {
        for (let i = e; i < e + 20; i++) {
            lines[i].style.opacity = `0`;
        }   
    }

    // fullOpacityCycle();
    // window.requestAnimationFrame(fullOpacityCycle);
}

function opacityNext () {
    for (let e = 0; e < lines.length; e+=40){
        lines[e].style.opacity = `0`;
        lines[e+20].style.opacity = `1`;
    }
}

// opacityStart();

function opacityStep (place) {
    // for (place; place <=20 )
    window.requestAnimationFrame(() => {
    lines[place].style.opacity = `0`;
    lines[place + 20].style.opacity = `1`;});
}

function rollingOpacityNext(e){
    for (e; e<lines.length; e +=40){
        lines[e].style.opacity = `0`;
        lines[e+20].style.opacity = `1`; 
    }
}

function fullOpacityCycle () {
    

    for (let i = 0; i <= 360; i+=40){
        window.requestAnimationFrame(() => {
        opacityCycle (i);});
    }

    // opacityReset();

    fullOpacityCycle();
}

function opacityCycle(start){
    for (let i = start; i < start+20; i++){
        opacityStep(i);
    }
}

let same = 0;
function rollingOpacityInterval () {
    rollingOpacityNext(same);
    same++;
    if (same == 379) {
        same = 0;
    }
    window.requestAnimationFrame(rollingOpacityInterval);
}

function cycle () {
    setTimeout (opacityReset, 80);
    setTimeout (fullOpacityCycle, 160);
    // window.requestAnimationFrame(cycle);
}

// setInterval (cycle, 240);



// rollingOpacityInterval();
// rollingOpacityInterval();
// rollingOpacityInterval();
// setTimeout(rollingOpacityInterval,100);
// function passWarning () {
//     //remove warning when button is clicked
//     document.getElementById(`warning`).parentNode.removeChild(document.getElementById(`warning`));

//     //remove warning css
//     document.styleSheets[0].deleteRule(0);

//     //start the animation
//     setInterval (cascade, 100, lines);
// }

// // switch background color
// let backgroundSwitch;
// setInterval(function(){
//     if (backgroundSwitch){
//         document.getElementById(`canvas`).style.backgroundColor = `rgb(0, 0, 255)`;}

//     else{
//         document.getElementById(`canvas`).style.backgroundColor = `rgb(0, 0, 0)`;
//     }
//     backgroundSwitch = !backgroundSwitch;
// },400);