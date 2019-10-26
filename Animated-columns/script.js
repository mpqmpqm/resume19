const body = document.querySelector(`body`);
const main = document.querySelector(`main`);
const divs = Array.from(document.querySelectorAll(`div`));

function setWindow () {
    body.style.width = window.innerWidth + `px`
    divs.forEach(el => {
        el.style.height = window.innerHeight + `px`
    });
}

main.addEventListener(`mouseover`, focus);
window.addEventListener(`resize`, setWindow)

function focus (event) {
    let focused = event.target;
    divs.forEach((el, index) => {
        if (el === focused){
            gridColumnBuilder(index);    
        }
    })
}

function gridColumnBuilder (index) {
    gridResult = ``;
    k = 16
    // for (let k = 16; k < 41; k++){
    for (let i = 0; i < 7; i++){
        
        if (i == index){
            gridResult+= k +`% `
        }

        else {gridResult+=`1fr `};
    }
    animateGrid();
    let gridResultArray = gridResult.split(` `);
    // console.log(gridResultArray);
    for (let z = 16; z<36; z+=.1){
        gridResultArray[index] = z +`%`;
        console.log(gridResultArray[index-1]);
        gridResult = gridResultArray.join(` `);
        animateGrid();
        // window.requestAnimationFrame(animateGrid)
    }
    // window.requestAnimationFrame(animateGrid);
}

function animateGrid () {
    main.style.gridTemplateColumns=gridResult;
    // window.requestAnimationFrame(animateGrid)
}

let gridResult = ``;
setWindow();
