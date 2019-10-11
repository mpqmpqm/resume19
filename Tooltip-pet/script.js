let frame = document.getElementById(`frame`);

const handlers = {
    
    hover: function (event) {
        if (event.target.className == `node`){
            let nodeTargetId = event.target.id;
            displayTip(nodeTargetId);
        }
        
    },
    leave: function (event) {
        if (event.target.className == `node`){
            let nodeTargetId = event.target.id;
            hideTip(nodeTargetId);
        }
    }
}
function hideTip (nodeTargetId) {
    let queryHelper = `.node:nth-child(` + nodeTargetId + `) > .node-info`;
    let nodeTargetedInfo = document.querySelector(queryHelper);
    nodeTargetedInfo.style.opacity = `0`;     
    }


function displayTip(nodeTargetId) {
    let queryHelper = `.node:nth-child(` + nodeTargetId + `) > .node-info`;
    let nodeTargetedInfo = document.querySelector(queryHelper);
    // let displayStyle = getComputedStyle(nodeTargetedInfo).display;
    // console.log(displayStyle);
    nodeTargetedInfo.style.opacity = `1`;
}

frame.addEventListener(`mouseover`, handlers.hover);
frame.addEventListener(`mouseout`, handlers.leave);