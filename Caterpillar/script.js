const textBox = document.querySelector(`textPath`);

// console.log(textContent[0]);

// typeof(textContent);

// let chars = Array.from(textContent);
// let charsCopy = [chars[1], chars[2], chars[3], chars[0]];
// let newText = charsCopy.join(``);
// textBox.innerHTML = newText;

// chars = Array.from(textBox.innerHTML);
// charsCopy = [chars[1], chars[2], chars[3], chars[0]];
// newText = charsCopy.join(``);
// textBox.innerHTML = newText;
function loopText () {
    let chars = Array.from(textBox.innerHTML);
    let charsCopy = [chars[1]]
    
    for (let i = 2; i<chars.length+1; i++)
        if (i==chars.length){
            charsCopy.push(chars[0]);
        }
        else {charsCopy.push (chars[i])};

    textBox.innerHTML = charsCopy.join(``);
}

setInterval (loopText, 10);

document.querySelector(`p`).innerHTML = window.innerWidth