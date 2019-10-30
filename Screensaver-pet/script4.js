const field = document.querySelector(`svg`)

function setField() {
    field.style.height = window.innerHeight;
    field.style.width = window.innerWidth;
}

setField();
window.addEventListener(`resize`, setField);

//svg lines are drawn from (x1, y1) to (x2, y2)
function drawLine(x1, y1, x2, y2) {
    let line = document.createElement(`line`);

    line.setAttribute(`x1`, x1);
    line.setAttribute(`y1`, y1);
    line.setAttribute(`x2`, x2);
    line.setAttribute(`y2`, y2);

    let animate = document.createElement(`animate`);
    animate.setAttribute(`attributeName`, "opacity");
    animate.setAttribute(`from`, "1");
    animate.setAttribute(`to`, "0");
    animate.setAttribute(`dur`, "2s");
    animate.setAttribute(`repeatCount`, "indefinite");

    line.append(animate);
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

drawLines(25);