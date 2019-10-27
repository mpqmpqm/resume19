const body = document.querySelector(`body`);
const main = document.querySelector(`main`);
const divs = Array.from(document.querySelectorAll(`main > div`));
const labels = Array.from(document.querySelectorAll(`.label`));
const texts = Array.from(document.querySelectorAll(`.text`));
const all = Array.from (document.querySelectorAll(`body *`));

function setWindow() {
    body.style.width = window.innerWidth + `px`;
    body.style.height = window.innerHeight + `px`;
    if (window.matchMedia(`only screen and (orientation: portrait)`).matches){
    all.forEach((el) => {
        el.style.transform =``;
        el.style.right = ``;
        el.style.left = ``;
        el.style.top = ``;

    })}
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

function focus(event) {
    let focused = event.target;
    divs.forEach((el, index) => {
        if (el === focused) {
            window.requestAnimationFrame(() => {
                flexSetter(index);
            })

        }
    })
    labels.forEach((el, index) => {
        if (el === focused) {
            window.requestAnimationFrame(() => {
                flexSetter(index);
            })
        }
    });
}

let lastFocused = 0;

function flexSetter(index) {

    for (let i = 0; i < 7; i++) {
        if (i == index) {
            divs[i].style.flexBasis = `75%`;
            divs[i].style.flexGrow = `1`;
            divs[i].style.zIndex = `999`;
            if (!window.matchMedia(`only screen and (orientation: portrait)`).matches) {
                if (index > lastFocused) {
                    labels[i].style.transform = `rotateZ(-90deg)`;
                    labels[i].style.right = ``;
                    labels[i].style.left = `-1.6vw`;
                } else {
                    labels[i].style.transform = `rotateZ(90deg)`;
                    labels[i].style.left = ``;
                    labels[i].style.right = `-1.6vw`;
                }
            }
            texts[i].style.display = `block`;
        } else {
            divs[i].style.flexBasis = `calc(25% / 6)`;
            divs[i].style.flexGrow = `0`;
            divs[i].style.zIndex = String(7 - Math.abs(i - index));
            texts[i].style.display = `none`

            if (!window.matchMedia(`only screen and (orientation: portrait)`).matches) {
                if (i < index) {
                    if (getComputedStyle(labels[i]).transform == "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)") {
                        labels[i].style.opacity = `0`;
                        setTimeout(() => {
                            labels[i].style.opacity = `1`;
                        }, 100);
                        labels[i].style.transform = `rotateZ(-90deg)`;
                    }
                } else if (i > index) {
                    if (getComputedStyle(labels[i]).transform == `matrix(6.12323e-17, -1, 1, 6.12323e-17, 0, 0)`) {
                        labels[i].style.opacity = `0`;
                        setTimeout(() => {
                            labels[i].style.opacity = `1`;
                        }, 100);
                        labels[i].style.transform = `rotateZ(90deg)`;
                    }
                }
            }
        }
    }

    lastFocused = index;

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