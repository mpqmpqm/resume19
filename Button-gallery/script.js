const flex = document.querySelector(`.flex-container`);

const items = Array.from (document.querySelectorAll(`.item`));

console.log(flex.clientWidth*.06);

console.log(document.querySelector(`.flex-container > .item`).clientWidth);

const boxWidth = document.querySelector(`.flex-container > .item`).clientWidth;

const marginWidth = flex.clientWidth*.06

console.log(boxWidth);

// flex.scroll(boxWidth*3 + marginWidth*6, 0);

const previous = document.querySelector(`button:first-child`);

const next = document.querySelector (`button:last-child`);

let elTracker = 0;

previous.addEventListener(`click`, clickedPrevious);
next.addEventListener (`click`, clickedNext)

function clickedPrevious (){
    if (elTracker == 0){
        return
    }

    else {
        elTracker-=1;
        scrollToEl(elTracker);
    }
}

function clickedNext (){
    if (elTracker == items.length -1){
        return
    }

    else {
        elTracker+=1;
        scrollToEl(elTracker);
    }
}

function getPosition(el){
    let scrollPosition = flex.scrollLeft;
    console.log(scrollPosition/el);
}

function scrollToEl (el) {
    console.log(el);
    getPosition(el);

    let boxes = el;
    let margins = boxes * 2;

    flex.scroll({
        left: boxWidth*boxes + marginWidth*margins,
        top: 0,
        behavior: `smooth`});

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
- 3 boxes */
