// 引入包
import initShaders from './initShaders.js';
import { mat4 } from './gl_matrix/esm/index.js';
import vertexShader from '../shaders/vertexShader.js';
import fragmentShader from '../shaders/fragmentShader.js';
import { positions, colors } from './cube_data.js'

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

initShaders(gl, vertexShader, fragmentShader);

initBuffers(gl);

let deg = 45;
// 旋转
let rotateMatrix = mat4.create();
mat4.fromRotation(rotateMatrix, deg / 180 * Math.PI, [1, 1, 0]);

// 平移
let translateMatrix = mat4.create();
mat4.fromTranslation(translateMatrix, [0.5, 0.0, 0.0]);

// 缩放
let scaleMatrix = mat4.create();
mat4.fromScaling(scaleMatrix,[0.5,0.5,0.5]);

let u_rotateMatrix = gl.getUniformLocation(gl.program, 'u_rotateMatrix');
let u_translateMatrix = gl.getUniformLocation(gl.program, 'u_translateMatrix');
let u_scaleMatrix = gl.getUniformLocation(gl.program, 'u_scaleMatrix');


gl.uniformMatrix4fv(u_rotateMatrix, false, rotateMatrix);
gl.uniformMatrix4fv(u_translateMatrix, false, translateMatrix);
gl.uniformMatrix4fv(u_scaleMatrix, false, scaleMatrix);

draw(gl);



function initBuffers(gl) {
    // let positions = new Float32Array([
    //     -0.5, 0.5, 0.0,
    //     -0.5, -0.5, 0.0,
    //     0.5, -0.5, 0.0,
    //     0.5, 0.5, 0.0,
    // ]);
    // console.log(positions);
    // console.log(colors);
    let F_SIZE = positions.BYTES_PER_ELEMENT



    // 创建buffer
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    let a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, F_SIZE * 3, 0)
    gl.enableVertexAttribArray(a_position);

    let colorsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    let a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, F_SIZE * 3, 0);
    gl.enableVertexAttribArray(a_color);

}



function draw(gl) {
    // 清除画布
    gl.clearColor(0.3, 0.4, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(gl.TRIANGLE_FAN, 0, 24);

    // 前面的颜色遮住后面
    gl.enable(gl.DEPTH_TEST);
    // 每个面都是单色的立方体
    for (let i = 0; i < 24; i += 4) {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);

    };

}
