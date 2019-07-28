var lis = document.querySelectorAll('div');
var x;
var phrase = ['omg', 'lol', 'no&nbsp;way!', 'so&nbsp;cool!', 'wow!', 'amayz', 'siqq']

function colorReload (){

for (x of lis) {
    
    var randomColor = "background-color:" + '#'+Math.random().toString(16).substr(2,6);
;
        
    x.setAttribute("style", randomColor);
    
    
    var randomPhrase = phrase[Math.floor(Math.random() * 7)]
    
    x.innerHTML = randomPhrase;

}}

window.setInterval(colorReload, 300);