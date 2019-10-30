const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);
let vertexShaderText = [
     `precision mediump float;`, 
     ``,
     `attribute vec2 vertPosition;`,
     `attribute vec3 vertColor;`,
     `varying vec3 fragColor;`,
     `void main ()`,
     `{`,
     ` gl_Position = vec4(vertPosition, 0.0, 1.0);`,
     `fragColor = vertColor;`,
      `}`
].join (`\n`)

let fragmentShaderText = [
    `precision mediump float;`,
    `varying vec3 fragColor;`,
    `void main () {`,
    `gl_FragColor = vec4(fragColor, 1.0);}`
].join(`\n`);


function setCanvas() {
    canvas.style.height = window.innerHeight + `px`;
    canvas.style.width = window.innerWidth + `px`;
    canvas.setAttribute(`width`, window.innerWidth + `px`);
    canvas.setAttribute(`height`, window.innerHeight + `px`);
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);

}

setCanvas();
window.addEventListener(`resize`, setCanvas);

gl.clearColor (1, 1, 1, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

let vertexShader = gl.createShader(gl.VERTEX_SHADER);
let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderText);
gl.shaderSource(fragmentShader, fragmentShaderText);

gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
    console.error(`Yikers`, gl.getShaderInfoLog(vertexShader));
}
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
    console.error(`Yikers`, gl.getShaderInfoLog(fragmentShader));
}

let program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`Error linking!`, gl.getProgramInfoLog(program));
}

gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
    console.error (`Additional errors`, gl.getProgramInfoLog(program));
}

let triangleVerts = [
    //X, Y          //R, G, B
    0.0, 1.0,       1.0, 0.0, 0.0,
    -1.0, -1.0,     0.0, 1.0, 0.0,
    1.0, -1.0,      0.0, 0.0, 1.0
];

let triangleVertsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerts), gl.STATIC_DRAW);

let positionAttributeLoc = gl.getAttribLocation(program, `vertPosition`);
let colorAttributeLoc = gl.getAttribLocation(program, `vertColor`);
gl.vertexAttribPointer(
    positionAttributeLoc, 
    2,
    gl.FLOAT,
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT,
    0);

gl.vertexAttribPointer(
    colorAttributeLoc, 
    3,
    gl.FLOAT,
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT);
gl.enableVertexAttribArray(positionAttributeLoc);
gl.enableVertexAttribArray(colorAttributeLoc);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);