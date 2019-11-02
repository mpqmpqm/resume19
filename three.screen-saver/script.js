const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera 
    (45, //FOV in degrees
    window.innerWidth/window.innerHeight, //aspect ratio
    1, // near
    500 // far
    );

camera.position.set (0,0,100);
camera.lookAt (0,0,0);
const renderer = new THREE.WebGLRenderer();

function setSize (){
renderer.setSize (window.innerWidth*devicePixelRatio, window.innerHeight*devicePixelRatio);

}

setSize();
document.body.appendChild(renderer.domElement);

function resize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize (
    window.innerWidth*devicePixelRatio, window.innerHeight*devicePixelRatio);
    renderer.render (scene, camera);
}

window.addEventListener(`resize`, resize);




// const geometry = new THREE.Geometry();
// geometry.vertices.push (new THREE.Vector3(-window.innerWidth,window.innerHeight,0));
// // geometry.vertices.push (new THREE.Vector3 (0 ,10, 0));
// geometry.vertices.push (new THREE.Vector3(window.innerWidth,-window.innerHeight,0));

// const line = new THREE.Line (geometry, material);
// line.linewidth = 2;
// const lineTwozie = new THREE.Line (geometry, material);
// // line.linewidth = 2;

let lines = [];

function percentToPixel (percent, axis) {
    if (axis ==`x`) {
        return Math.round((percent/100) * window.innerWidth);
    }

    else {
     return Math.round((percent/100) * window.innerHeight);}
}

function makeLine (x1, y1, x2, y2){
    let geometry = new THREE.Geometry();
    geometry.vertices.push (new THREE.Vector3(x1, y1, 0));
    geometry.vertices.push (new THREE.Vector3(x2, y2, 0));
    let material = new THREE.LineBasicMaterial ({color: 0xffffff, transparent: true});
    return new THREE.Line (geometry, material);
}

function drawLines () {
    let linesArray = [];
    
    // linesArray.push (makeLine ((window.innerWidth/2), -(window.innerHeight/2), -window.innerWidth/2, window.innerHeight/2));

    // linesArray.push (makeLine (-(window.innerWidth), window.innerHeight, window.innerWidth, -window.innerHeight));

    for (let i = 0; i <=100; i+=2){
        linesArray.push (makeLine (-window.innerWidth, window.innerHeight - percentToPixel(i, `y`), window.innerWidth, -window.innerHeight + percentToPixel(i, `y`)));
    }

    for (let i = 98; i >=0; i-=2) {
        linesArray.push (makeLine (-window.innerWidth, -window.innerHeight + percentToPixel(i, `y`), window.innerWidth, window.innerHeight - percentToPixel(i, `y`)));
    }

    for (let i = 2; i <=98; i+=2) {
        linesArray.push (makeLine(-window.innerWidth+percentToPixel(i, `x`), -window.innerHeight, window.innerWidth-percentToPixel(i, `x`), window.innerHeight));
    }

    for (let i = 100; i >=2; i-=2) {
        linesArray.push (makeLine(window.innerWidth-percentToPixel(i, `x`), -window.innerHeight, -window.innerWidth+percentToPixel(i, `x`), window.innerHeight));
    }

    
    // linesArray.push (makeLine (-(window.innerWidth), 0, window.innerWidth, 0));

    // linesArray.push (makeLine (0, window.innerHeight, 0, -window.innerHeight));

    // linesArray.push (makeLine (-(window.innerWidth), window.innerHeight-percentToPixel(50, `y`), window.innerWidth, -window.innerHeight + percentToPixel(50, `y`)));

    // linesArray.push (makeLine (-(window.innerWidth), -window.innerHeight + percentToPixel(50, `y`), window.innerWidth, window.innerHeight - percentToPixel(50, `y`)));

    // linesArray.push (makeLine (-(window.innerWidth), -window.innerHeight, window.innerWidth, window.innerHeight));
    // linesArray.push (makeLine (-window.innerWidth, window.innerHeight - 100, window.innerWidth, -window.innerHeight + 100));

    // linesArray.push (makeLine (-window.innerWidth, window.innerHeight - 300, window.innerWidth, -window.innerHeight + 300));

    // linesArray.push (makeLine (-window.innerWidth, window.innerHeight - 600, window.innerWidth, -window.innerHeight + 600));

    // linesArray.push (makeLine (-window.innerWidth, window.innerHeight - 800, window.innerWidth, -window.innerHeight + 800));

    // linesArray.push (makeLine (-window.innerWidth, window.innerHeight - 700, window.innerWidth, -window.innerHeight + 700));
    // linesArray.push (makeLine (-window.innerWidth, window.innerHeight - 913.75, window.innerWidth, -window.innerHeight + 913.75));
    // for (let i = 0; i <= 100; i+=1) {
    //     linesArray.push(makeLine(0, percentToPixel(i, `y`), window.innerWidth, percentToPixel (100 - i, `y`)));
    // }

    // for (let i = .5; i <= 99.5; i+=1) {
        
    //     linesArray.push(makeLine(percentToPixel(100 - i, `x`), 0, percentToPixel(i, `x`), window.innerHeight));
    // }

    return linesArray;

}
// lines.push(makeLine(0, 0, 400, 400));

scene.background = new THREE.Color(0x000000);

// let lines = [line, lineTwozie]

lines = drawLines();


lines.forEach(line => {
    scene.add(line);
    // console.log(line);
})
// camera.position.z = 5;
// cube.rotation.z = 1

let opacitySwitch = true;
let i = 0;
let k = 1;
let ySwitch = true;

function animate () {
    requestAnimationFrame(animate);
    
    meshTest.rotation.z -=.08
    if (opacitySwitch){
        lines[i].material.opacity = 0;
        
    }
    
    else {
        lines[i].material.color =  {r: 0, g: 1, b:0};
        lines[i].material.opacity = 1;
        // lines[i].material.color =  {r: 1, g: 1, b: 1};
    }
    
    // // lineTwozie.rotation.z += 0.2;
    // // debugger;

    // if (ySwitch){
    // setTimeout(() => {
    //     scene.rotation.y += .015
    //     }, 100)}
    
    // else {
    //     scene.rotation.y -= .015;
    //     setTimeout(() => {
    //         scene.rotation.y += .015
    //         }, 100)}
    
    // ySwitch = !ySwitch;
    scene.rotation.y -= .015
    scene.rotation.z += .04;
    renderer.render (scene, camera);

    i+=10;
    if (i>=200){
        i=0;
        i+=k;
        // k+=0;
        if (k>=200){
            k=0
            k++;
        }
        opacitySwitch = !opacitySwitch;
    }
    // debugger;
}



renderer.render (scene, camera);

let meshGeometry = new THREE.Geometry();
meshGeometry.vertices.push (new THREE.Vector3(-100, -100, 0));
meshGeometry.vertices.push (new THREE.Vector3(100, 100, 0));

let meshLine = new MeshLine ();
meshLine.setGeometry(meshGeometry);

let meshMaterial = new MeshLineMaterial ({lineWidth: .6, color: new THREE.Color(0xff0000), sizeAttenuation: 1, resolution: new THREE.Vector2 (window.innerWidth*devicePixelRatio, window.innerHeight*devicePixelRatio), near: 1, far: 500});

let meshTest = new THREE.Mesh (meshLine.geometry, meshMaterial);
scene.add(meshTest);

renderer.render (scene, camera);

animate();
// animateK();
// setTimeout(animate, 100);

function test() {
    renderer.render (scene, camera);
}