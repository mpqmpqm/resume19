const teaserReel = document.getElementById(`teaser`);
const fullView = document.querySelector(`#fullView > img`)

const showFull = {

    display: function(event) {
        showFull.setSrc(event);
        showFull.setPlace(event);
    },

    setSrc: function (event){
        let newSrc = event.target.getAttribute(`src`)
        fullView.setAttribute(`src`, newSrc);
    },

    setPlace: function (){
        
        let clicked = event.target;

        if (getComputedStyle(clicked).width.slice(0,-2)>getComputedStyle(clicked).height.slice(0,-2)){
            fullView.style.objectPosition = `left`;
            // fullView.style.objectFit = `cover`;
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
}

teaserReel.addEventListener(`click`, showFull.display);
// function showFull (event){
//     let newSrc = event.target.getAttribute(`src`)
    
    

//     if (getComputedStyle(fullView).width > getComputedStyle(fullView).height)
    

// }