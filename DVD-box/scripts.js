const container = document.querySelector(`body`);
const box = document.getElementById(`box`);

function start (){
    setDimensions();
    let app = setInterval(setPlot, 1000);
}

function reset (){
    clearInterval(app);
    // catch{clearInterval(app);};
    start();
}
function setDimensions (){
    let containerHeight = window.innerHeight;
    container.style.height = containerHeight;

    let containerWidth = window.innerWidth;
    container.style.width = containerWidth;

    if (containerWidth > containerHeight) {
        let squareSetter = containerWidth;

        box.style.height = box.style.width = (squareSetter / 8) + `px`;
    }

    else {
        let squareSetter = containerHeight;
        box.style.height = box.style.width = (squareSetter / 6) + `px`;
        
    }
}

let boxSize = function(){
    return getComputedStyle(box).width.slice(0,-2);}

let maxCoord = function(axis){
    if (axis==`x`){
        return (window.innerWidth)-boxSize();
    }
    
    else {
        return (window.innerHeight)-boxSize();
    }
}

window.addEventListener(`resize`, reset);
start();

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

const waypoints = {
    toTop: function (){
        let xCoord = randomIntFromInterval(0, maxCoord(`x`));
        let yCoord = 0;
        this.setCourse(xCoord, yCoord);
    },
    toRight: function(){
        let xCoord = maxCoord(`x`);
        let yCoord = randomIntFromInterval(0, maxCoord(`y`));
        this.setCourse(xCoord, yCoord);
    },

    toBottom: function(){
        let yCoord = maxCoord(`y`);
        let xCoord = randomIntFromInterval(0, maxCoord(`x`));
        this.setCourse(xCoord, yCoord);
    },
    toLeft: function(){
        let xCoord = 0;
        let yCoord = randomIntFromInterval(0, maxCoord(`y`));
        this.setCourse(xCoord, yCoord);
    },
    setCourse: function(xCoord, yCoord){
        box.style.left = xCoord + `px`;
        box.style.top = yCoord + `px`;
        console.log(xCoord,yCoord);
    }
}

let edgeHistory = [`t`];
function edgeTracker (lastEdge){

}

function rememberLast(){}

function randomAssigner (edge1, edge2, edge3) {
    let chanceNum = Math.random();
    
    if (chanceNum <= (1/3)){
        edge1.call(waypoints);
    }
    
    else if (chanceNum > 1/3 && chanceNum <= 2/3){
        edge2.call(waypoints)
    }
    
    else {
        edge3.call(waypoints)
    }
}

function setPlot () {

    let xCoord = getComputedStyle(box).left.slice(0,-2);
    let yCoord = getComputedStyle(box).top.slice(0,-2);;
    

    //if we're at the left edge...
    if (xCoord == 0) {
        
        //we can go top, right, or bottom
        randomAssigner (waypoints.toTop, waypoints.toRight, waypoints.toBottom);
        rememberLast(`left`);
    }

    //if we're at the top edge...
    else if (yCoord == 0) {
        
        // we can go right, bottom, or left
        randomAssigner(waypoints.toRight, waypoints.toBottom, waypoints.toLeft);

        rememberLast(`top`);
    }
    
    //if we're at the right edge...
    else if (xCoord == maxCoord(`x`)) {
        
        //we can go bottom, left, or top
        randomAssigner(waypoints.toBottom, waypoints.toLeft, waypoints.toTop);

        rememberLast(`right`);
    }

    //if we're at the bottom edge...
    else {
        
        //we can go left, top, or right
        randomAssigner(waypoints.toLeft, waypoints.toTop, waypoints.toRight);

        rememberLast(`bottom`)
    }

    // box.style.left = xCoord + `px`;
    // box.style.top = yCoord + `px`;


}

