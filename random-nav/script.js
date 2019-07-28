var randButton = document.querySelectorAll('div');


console.log(randButton[1]);
console.log(randButton[0]);

function assignButtons() {

    var decider = Math.floor(Math.random() * 2);
    console.log(decider);
    
    if (decider == 0) {
        randButton[0].innerHTML = "<a href='https://www.instagram.com/mpqmpqm/'>MP(Q?)</a>";
        randButton[1].innerHTML = "<a href='https://mpqmpqm.github.io/'>MPQ</a>";
    }
    
    else {
        randButton[1].innerHTML = "<a href='https://www.instagram.com/mpqmpqm/'>MP(Q?)</a>";
        randButton[0].innerHTML = "<a href='https://mpqmpqm.github.io/'>MPQ</a>";
    }
}
    
window.setInterval(assignButtons, 540);