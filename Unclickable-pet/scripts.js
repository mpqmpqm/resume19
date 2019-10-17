const escaper = document.querySelector(`#escapist`);

alert(`A prize awaits behind the link! Moused devices only.`);

escaper.addEventListener(`mouseover`, function () {

    let topCurrent = getComputedStyle(escaper).top.slice(0,-2);
    console.log(topCurrent);

    //top must be above 0px, below 630px

    let topRandom = Math.floor(Math.random() * 630)

    // while (topRandom < -60) {
    //     topRandom++;
    // }

    let topNew = topRandom;

    let topRandomDelta = Math.max(topRandom, topCurrent) - Math.min(topRandom, topCurrent);

    for (let i = 0; i < 100; i++) {

        if (topRandomDelta >= 400){
            break;
        }
        let topRandomCompete = Math.floor(Math.random() * 630)

        // while (topRandomCompete < -60) {
        //     topRandomCompete++;
        // }

        if (Math.max(topCurrent, topRandomCompete) - Math.min(topCurrent, topRandomCompete) > topRandomDelta) {
            topRandomDelta = Math.max(topCurrent, topRandomCompete) - Math.min(topCurrent, topRandomCompete);
            topNew = topRandomCompete;
        }
    }

    //left must be greater than -60, less than 874

    //only trigger the horizontal reorientation some percentage of the time

    let leftCurrent = getComputedStyle(escaper).left.slice(0,-2);
    // console.log(topCurrent);

    let leftRandom = Math.floor(Math.random() * 934 - 60);

    while (leftRandom <-60) {
        leftRandom++;
    }

    let leftNew = leftRandom;

    let leftRandomDelta = Math.max(leftRandom, leftCurrent) - Math.min(leftRandom, leftCurrent);

    for (let i = 0; i < 100; i++) {

        if (Math.random() > .4){
            if (leftRandomDelta >= 160){
                break;
            }
        }

        if (leftRandomDelta >= 660){
            break;
        }

        let leftRandomCompete = Math.floor(Math.random() * 934 -60)

        while (leftRandomCompete <-60) {
            leftRandomCompete++;
        }

        if (Math.max(leftCurrent, leftRandomCompete) - Math.min(leftCurrent, leftRandomCompete) > leftRandomDelta) {
            leftRandomDelta = Math.max(leftCurrent, leftRandomCompete) - Math.min(leftCurrent, leftRandomCompete);
            leftNew = leftRandomCompete;
        }
    }
        
    escaper.style.top = topNew + `px`;
    escaper.style.left = leftNew + `px`;
    escaper.innerHTML = `Nice try!!`;
    setTimeout (function (){
        escaper.innerHTML = `<a href="https://www.instagram.com/mpqmpqm/">Click me!</a>`
    }, 1800);
   

})