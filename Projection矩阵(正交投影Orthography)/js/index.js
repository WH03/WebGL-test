// 引入包
import initShaders from './initShaders.js';
import { mat4 } from './gl_matrix/esm/index.js';
import vertexShader from '../shaders/vertexShader.js';
import fragmentShader from '../shaders/fragmentShader.js';

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

initShaders(gl, vertexShader, fragmentShader);

initBuffers(gl);

draw(gl);

function initBuffers(gl) {
    let vertices = new Float32Array([-0.8, -0.5, -0.5, 1.0, 0.0, 0.0,
        0.0, 0.8, -0.5, 1.0, 0.0, 0.0,
        0.8, -0.5, -0.5, 1.0, 0.0, 0.0,

        -0.8, 0.5, 0.5, 0.0, 0.0, 1.0,
        0.0, -0.8, 0.5, 0.0, 0.0, 1.0,
        0.8, 0.5, 0.5, 0.0, 0.0, 1.0,

    ]);
    let F_SIZE = vertices.BYTES_PER_ELEMENT

    // 创建buffer
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    let a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, F_SIZE * 6, F_SIZE * 0)
    gl.enableVertexAttribArray(a_position);


    let a_color = gl.getAttribLocation(gl.program, 'a_color');

    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, F_SIZE * 6, F_SIZE * 3);
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
    gl.drawArrays(gl.TRIANGLES, 0, 6);

}