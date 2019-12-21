const subRegion = document.querySelector(`.sub-region`);
const tip = document.querySelector(`.tip`)

const showTip = () => {
    tip.style.display = `block`;
}

const hideTip = () => {
    tip.style.display = `none`;
}

const moveHandler = (event) => {
    tip.style.left = event.clientX + 15 +`px`;
    tip.style.top = event.clientY - 60+ `px`;
}

const hoverHandler = () => {
    setTimeout(showTip, 100);
    subRegion.addEventListener(`mousemove`, moveHandler);
}

const leaveHandler = () => {
    hideTip();
}

subRegion.addEventListener(`mouseover`, hoverHandler);
subRegion.addEventListener(`mouseout`, leaveHandler);

