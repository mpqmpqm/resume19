const flex = document.querySelector(`.flex-container`);

const items = Array.from(document.querySelectorAll(`.item-container`));

// const diagnostic = document.querySelector(`#diagnostic`);

// const diagnosticTwo = document.querySelector(`#diagnosticTwo`);

let elWidth;

 

function setElWidth (width) {
    elWidth = Number(width.slice(0,-2));
}

function itemWidthFloor (){
    document.body.style.height = ``;
    document.body.style.width =``;

    document.body.style.height = window.innerHeight + `px`;
    document.body.style.width = window.innerWidth +`px`;
    setElWidth(getComputedStyle(document.querySelector(`.item-container`)).width);
    // elWidth = width.slice(0,-2);
}

itemWidthFloor()
window.addEventListener(`resize`, itemWidthFloor);

// console.log(flex.clientWidth*.06);

// console.log(document.querySelector(`.flex-container > .item`).clientWidth);



const previous = document.querySelector(`button:first-child`);

const next = document.querySelector(`button:last-child`);

// let elTracker = 0;

previous.addEventListener(`click`, clickedPrevious);
next.addEventListener(`click`, clickedNext)


function getPosition() {
    return flex.scrollLeft;
}


function clickedPrevious() {

    let position = getPosition();

    // flex.style.scrollSnapType = ``;

    if (position == 0) {
        scrollToEl(elWidth*(items.length-1));

    } else {
            scrollToEl(position-elWidth);
        }
    }

    // flex.style.scrollSnapType = `x mandatory`;
    /* 
        Coordinates:
        0-628: 0
        628 - 628*2: 1
        628*2-628*3: 2

        Suppose we're at 628*.4. In this case we want Click previous to take us to 0, and click next to take us to 628.

        What about 628*.6? In this case we want cp to go to 0, and cn to go to 628.

        628*.9 we still want cp = 0, cn = 628
        565.2 we still want cp = 0, cn = 628
        565.2/628 = .9

        Math.round (565.2/628) = 1
        Math.floor (565.2/628) = 0

        Suppose we're at 764.
        CP -> 628
        CN -> 1256

        while (place % elWidth > 0) {
            place--
        }

        while (place % elWidth > 0) {
            place++
        }


    */


    // let nextEl = Math.floor((Math.round(currentEl-elWidth))/elWidth);

    // // debugger;

    // if (currentEl == items.length -1){
    //     return
    // }

    // else {
    //     scrollToEl(nextEl);
    // }


function clickedNext() {

    let position = getPosition();

    // flex.style.scrollSnapType = ``;
    // debugger;

    if (position > (elWidth * (items.length-2) + 30)) {
        // items[-1].innerText = `wtf`;
        scrollToEl(0);

    } else {

            scrollToEl(position + elWidth);
        }
    }

    // flex.style.scrollSnapType = `x mandatory`;



//     let currentEl = getPosition();
//     let nextEl = Math.floor((Math.floor(currentEl+elWidth))/elWidth);

//     // debugger;

//     if (currentEl == items.length -1){
//         return
//     }

//     else {
//         scrollToEl(nextEl);
//     }
// }

function scrollToEl(position) {
    // console.log(el);

    requestAnimationFrame(() => {
        flex.scroll({
            left: position,
            top: 0,
            behavior: `smooth`
        });
    })

    

    // diagnostic.innerHTML += `Position: ${Math.floor(flex.scrollLeft)}\n`;

    // diagnosticTwo.innerHTML += `Conditional: ${(items.length-1) *elWidth}\n`;

    // items.forEach(el => {
    //     el.innerText = `position: ${position}\n 
    //     (items.length - 1) * elWidth: ${(items.length - 1) * elWidth}`}
    //     )

}

/*to get to element 0, we scroll past:
- 0 margins
- 0 boxes
*/

/*to get to element 1, we scroll past:
- 2 margins
- 1 boxes
*/

/*to get to element 2, we scroll past:
- 4 margins
- 2 boxes */

/*to get to element 3, we scroll past:
- 6 margins
- 3 boxes*/