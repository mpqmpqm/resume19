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
    k = 36;
    // for (let k = 16; k < 41; k++){
    for (let i = 0; i < 7; i++){
        
        if (i == index){
            gridResult+= k +`% `
        }

        else {gridResult+=`calc(64% / 6) `};
    }
    gridResult = gridResult.trim();
    animateGrid();
    // let gridResultArray = gridResult.split(` `);
    // console.log(gridResultArray[index]);
    // for (let z = 16; z<36; z+=1){
    //     gridResultArray[index] = z +`%`;
    //     // console.log(gridResultArray[index])};
    //     gridResult = gridResultArray.join(` `);
    //     console.log(gridResult);
    //     animateGrid();
    // }
        // window.requestAnimationFrame(animateGrid)}
    // }
    // window.requestAnimationFrame(animateGrid);
}

function animateGrid () {
    main.style.gridTemplateColumns=gridResult;
    window.requestAnimationFrame(animateGrid)
}

let gridResult = ``;
setWindow();
