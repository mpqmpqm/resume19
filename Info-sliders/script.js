const body = document.querySelector(`body`);
const main = document.querySelector(`main`);
const divs = Array.from(document.querySelectorAll(`main > div`));

function setWindow () {
    body.style.width = window.innerWidth + `px`
    body.style.height = window.innerHeight + `px`
    // divs.forEach(el => {
    //     el.style.height = window.innerHeight + `px`
    // });
}

main.addEventListener(`click`, focus);
window.addEventListener(`resize`, setWindow)

// function focus (event) {
//     let focused = event.target;
//     divs.forEach((el, index) => {
//         if (el === focused){
//             window.requestAnimationFrame(() => {
//                 flexSetter(index);})    
//         }}
//     )
// }

function focus (event) {
    window.requestAnimationFrame(() => {
    let focused = event.target;
    divs.forEach((el, index) => {
        if (el === focused){
                flexSetter(index);
            }  
        })
    })
}

function flexSetter (index){
    
    for (let i = 0; i < 7; i++){
        if (i == index) {
            divs[i].style.flexBasis = `75%`;
            divs[i].style.flexGrow = `1`;
            divs[i].style.zIndex = `999`;
        }

        else {
            divs[i].style.flexBasis = `calc(25% / 6)`;
            divs[i].style.flexGrow = `0`;
            divs[i].style.zIndex = String (7 - Math.abs(i - index));
        }
    }

}
// function gridColumnBuilder (index) {
//     gridResult = ``;
//     k = 36;
//     // for (let k = 16; k < 41; k++){
//     for (let i = 0; i < 7; i++){
        
//         if (i == index){
//             gridResult+= k +`% `
//         }

//         else {gridResult+=`calc(64% / 6) `};
//     }
//     gridResult = gridResult.trim();
//     animateGrid();
//     // let gridResultArray = gridResult.split(` `);
//     // console.log(gridResultArray[index]);
//     // for (let z = 16; z<36; z+=1){
//     //     gridResultArray[index] = z +`%`;
//     //     // console.log(gridResultArray[index])};
//     //     gridResult = gridResultArray.join(` `);
//     //     console.log(gridResult);
//     //     animateGrid();
//     // }
//         // window.requestAnimationFrame(animateGrid)}
//     // }
//     // window.requestAnimationFrame(animateGrid);
// }

// function animateGrid () {
//     main.style.gridTemplateColumns=gridResult;
//     window.requestAnimationFrame(animateGrid)
// }

// let gridResult = ``;
setWindow();
