function area() {

    var traveller = document.querySelector('a');
    var columnStart = Math.floor(Math.random() * 16) + 1;
    var columnSpan = Math.floor(Math.random() * (16 - columnStart)) + 1;
    
    var rowStart = Math.floor(Math.random() * 9) + 1;
    var rowSpan = Math.floor(Math.random() * (9-rowStart)) + 1;
    
    var rowHeight = "line-height: calc(calc(100vh/9) * " + rowSpan.toString() + ");";
    
    var styleColumn = "grid-column: " + columnStart.toString() + " / span " + columnSpan.toString() +";";
    
    var styleRow = "grid-row: " + rowStart.toString() + " / span " + rowSpan.toString() +";";
//    
    var styleArea = styleColumn + styleRow + rowHeight;

//    console.log(rowStart);
//    console.log(rowSpan);
//    console.log(styleRow);
//    
    traveller.setAttribute("style", styleArea); 
    
}

window.setInterval(area, 300);
