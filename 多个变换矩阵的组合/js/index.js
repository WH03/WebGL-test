// 引入包
import initShaders from './initShaders.js'
import { mat4, glMatrix } from './gl_matrix/dist/esm/index.js'

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

let vertexShader = `
    attribute vec3 a_position;
    uniform mat4 u_sMatrix;
    uniform mat4 u_tMatrix;
    uniform mat4 u_rMatrix;
    void main(){
        gl_Position = u_sMatrix * u_tMatrix * u_rMatrix * vec4(a_position,1.0);
        gl_PointSize= 10.0;
    }
`;

let fragmentShader = `
    precision mediump float;
    void main(){
        gl_FragColor = vec4(1.2,0.8,0.9,1.0);
    }
`
initShaders(gl, vertexShader, fragmentShader);

initBuffers(gl);

let tMatrix = mat4.create();
let sMatrix = mat4.create();
let rMatrix = mat4.create();

mat4.fromTranslation(tMatrix, [0.5, 0.0, 0.0]);
mat4.fromScaling(sMatrix, [1, 2, 1, ]);
mat4.fromRotation(rMatrix, glMatrix.toRadian(10), [0, 0, 1]);

let u_rMatrix = gl.getUniformLocation(gl.program, 'u_rMatrix');
let u_sMatrix = gl.getUniformLocation(gl.program, 'u_sMatrix');
let u_tMatrix = gl.getUniformLocation(gl.program, 'u_tMatrix');
gl.uniformMatrix4fv(u_rMatrix, false, rMatrix);
gl.uniformMatrix4fv(u_sMatrix, false, sMatrix);
gl.uniformMatrix4fv(u_tMatrix, false, tMatrix);



function initBuffers(gl) {
    let vertices = new Float32Array([-0.2, -0.2, 0.0,
        0.2, -0.2, 0.0,
        0.0, 0.2, 0.0
    ])
    let F_SIZE = gl.BYTES_PRE_ELEMENT;

    let a_position = gl.getAttribLocation(gl.program, 'a_position');

    // 创建buffer
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(
        a_position,
        3,
        gl.FLOAT,
        false,
        3 * F_SIZE,
        0
    );
    gl.enableVertexAttribArray(a_position);
}

draw(gl)

function draw(gl) {
    // 清除画布
    gl.clearColor(0.3, 0.4, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 3);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}