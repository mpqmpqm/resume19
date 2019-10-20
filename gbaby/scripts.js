const teaserReel = document.getElementById(`teaser`);
const fullView = document.querySelector(`#fullView > img`)

const showFull = {

    display: function(event) {
        showFull.setSrc(event);
        showFull.setPlace(event);
    },

    setSrc: function (event){
        if (event.target.tagName == `IMG`){
            let newSrc = event.target.getAttribute(`src`);
            fullView.setAttribute(`src`, newSrc);
    }
    },

    setPlace: function (){
        
        let clicked = event.target;

        if (clicked.tagName ==`IMG`){

            if (getComputedStyle(clicked).width.slice(0,-2)>getComputedStyle(clicked).height.slice(0,-2)){
                fullView.style.objectPosition = `center`;
                fullView.style.objectFit = `contain`;
            }

            else{
                fullView.style.objectPosition = `center`;
                fullView.style.objectFit = `contain`;
            }
        }

    //     if (getComputedStyle(fullView).width.slice(0,-2) > getComputedStyle(fullView).height.slice(0,-2))
    //     {
    //         fullView.style.objectPosition = `left`;
    //     }
    //     else {
    //         fullView.style.objectPosition = `center`;
    //     }
    // }
}}

function pointer (event){
    if (event.target.tagName==`IMG`){
        event.target.style.cursor = `pointer`;
    }
}

teaserReel.addEventListener(`click`, showFull.display);

teaserReel.addEventListener(`mouseover`, pointer)
// function showFull (event){
//     let newSrc = event.target.getAttribute(`src`)
    
    

//     if (getComputedStyle(fullView).width > getComputedStyle(fullView).height)
    

// }