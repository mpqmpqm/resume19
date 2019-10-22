const field = document.getElementById(`field`);
const topLeft = Array.from(document.querySelectorAll(`text`))[0];
const bottomRight = Array.from(document.querySelectorAll(`text`))[1];

function setField () {
    field.style.height = window.innerHeight;
    field.style.width = window.innerWidth;
}

setField();
window.addEventListener(`resize`, setField)

let i = 0;
setInterval (function (){
    if (i > 360){
        i=0;
    }
    
    topLeft.style.transform = `rotateZ(`+i + `deg`+`)`; 
    i++;
    // console.log(getComputedStyle(circle).transform);
}, 20);

let k = 360;
setInterval (function (){
    if (k < 1){
        k=360;
    }
    
    bottomRight.style.transform = `rotateZ(`+k + `deg`+`)`; 
    k--;
    // console.log(getComputedStyle(bottomRight).transform);
}, 20);

