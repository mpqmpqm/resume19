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

renderer.setSize (window.innerWidth*devicePixelRatio, window.innerHeight*devicePixelRatio);

document.body.appendChild(renderer.domElement);



const material = new THREE.LineBasicMaterial ({color: 0xffffff});

const geometry = new THREE.Geometry();
geometry.vertices.push (new THREE.Vector3(-window.innerWidth,window.innerHeight,0));
// geometry.vertices.push (new THREE.Vector3 (0 ,10, 0));
geometry.vertices.push (new THREE.Vector3(window.innerWidth,-window.innerHeight,0));

const line = new THREE.Line (geometry, material);
line.linewidth = 2;
const lineTwozie = new THREE.Line (geometry, material);
// line.linewidth = 2;

let lines = [];

for (let i = 0; i<=20; i++) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push (new THREE.Vector3(-window.innerWidth,window.innerHeight - i* 100,0));
    geometry.vertices.push (new THREE.Vector3(window.innerWidth,-window.innerHeight + i* 100,0));
    lines.push (new THREE.Line (geometry, material));
}

scene.background = new THREE.Color(0x000000);

// let lines = [line, lineTwozie]

// scene.add(lines[0],lines[1]);

lines.forEach(line => {
    
    scene.add(line);
})
// camera.position.z = 5;
// cube.rotation.z = 1

function animate () {
    requestAnimationFrame(animate);
    let i = 0;
    lines.forEach(line => {
        line.rotation.z -= 0.08
        // setTimeout(() => }, i);
        // i+=1;
    })
    
    // lineTwozie.rotation.z += 0.2;
    renderer.render (scene, camera);
}

animate();