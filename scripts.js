// const colorButton = document.getElementById(`colorButton`)

const nameDeco = document.getElementById(`name-deco`)
// nameDeco.style.color = `blue`;

function nameDecoColorAnimation (){
    if (getComputedStyle(nameDeco).color == `rgb(255, 0, 0)`){
        nameDeco.style.color = `blue`;
  
    }
    else{
        nameDeco.style.color = `red`;
    }
}

setInterval(nameDecoColorAnimation, 802);
