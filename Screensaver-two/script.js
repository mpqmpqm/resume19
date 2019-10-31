const body = document.querySelector(`body`);
// canvas.style.height = window.innerHeight +`px`
// canvas.style.width = window.innerWidth +`px`; 
let params = {width: window.innerWidth + `px`, height: window.innerHeight+ `px`}

const two = new Two(params).appendTo(body);

// let line = two.makeLine (0, 0, window.innerWidth, window.innerHeight);
// let lineTwo = two.makeLine ()

// let linesArray = [two.makeLine (0, 0, window.innerWidth, window.innerHeight), two.makeLine (100, 100, 600, 600)]

function percentToPixel (percent, axis) {
    if (axis ==`x`) {
        return Math.round((percent/100) * window.innerWidth);
    }

    else {
     return Math.round((percent/100) * window.innerHeight);}
}

function addLine (x1, y1, x2, y2) {
    return two.makeLine (x1, y1, x2, y2);
}

function drawLines () {
    let linesArray = [];

    for (let i = 0; i <= 100; i+=.5) {
        
        linesArray.push(addLine(0, percentToPixel(i, `y`), window.innerWidth, percentToPixel (100 - i, `y`)));
    }

    for (let i = .5; i <= 99.5; i+=.5) {
        
        linesArray.push(addLine(percentToPixel(100 - i, `x`), 0, percentToPixel(i, `x`), window.innerHeight));
    }
    return linesArray;
}

// let linesArray = []

let lines = two.makeGroup (drawLines());

lines.linewidth = 1;
lines.stroke = `white`;
let switcher;

// for (let i = 1; i < 200; i += 20) {

//     for (let k = i; k <= i + 10; k++) {
//         lines.children[k].opacity = 0;
//     }
// }
// lines.translation.set (two.width/2, two.height /2);

let line = 0;

// lines.children[0].bind (`update`, function (frameCount) {
//     this.rotation = frameCount/16;
// })
two.bind (`update`, function (frameCount) {

    lines.children[line].rotation = frameCount/600;
    line++;

    if (line == 400) {
        line = 0;
    }
    
}).play();


// lines.children[0].update();

// two.update();
