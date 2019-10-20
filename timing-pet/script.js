const box1 = document.querySelector(`div:first-child`);
const box2 = document.querySelector(`div:nth-child(2)`);
const box3 = document.querySelector(`div:nth-child(3)`);

const colorSet = {
    box1Set: function(){
        if (getComputedStyle(box1).backgroundColor == `rgb(255, 0, 0)`){
            box1.style.backgroundColor = `rgb(0, 255, 0)`;
        }

        else {
            box1.style.backgroundColor = `rgb(255, 0, 0)`}  
    },

    box2Set: function(){
        if (getComputedStyle(box2).backgroundColor == `rgb(0, 0, 255)`){
            box2.style.backgroundColor = `rgb(255, 0, 255)`;
        }

        else {
            box2.style.backgroundColor = `rgb(0, 0, 255)`}  
    },
    box3Set: function(){
        if (getComputedStyle(box3).backgroundColor == `rgb(0, 255, 255)`){
            box3.style.backgroundColor = `rgb(255, 255, 0)`;
        }

        else {
            box3.style.backgroundColor = `rgb(0, 255, 255)`}  
    }
}
// setInterval(colorSet.box1Set, 500), 2000;
// setTimeout(console.log, 2000, `same`);
setTimeout(setInterval, 0, colorSet.box1Set, 3000);
setTimeout(setInterval, 1000, colorSet.box2Set, 3000);
setTimeout(setInterval, 2000, colorSet.box3Set, 3000);
function startCycle (){

}


