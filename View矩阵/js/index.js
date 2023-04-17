// 引入包
import initShaders from './initShaders.js';
import { mat4 } from './gl_matrix/esm/index.js';
import vertexShader from '../shaders/vertexShader.js';
import fragmentShader from '../shaders/fragmentShader.js';
// import { positions, colors } from './cube_data.js'

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

initShaders(gl, vertexShader, fragmentShader);

initBuffers(gl);


// 设置缩放
let scaleMatrix = mat4.create();
mat4.fromScaling(scaleMatrix, [1.0, 0.5, 0.5]);
let u_scaleMatrix = gl.getUniformLocation(gl.program, 'u_scaleMatrix');
gl.uniformMatrix4fv(u_scaleMatrix, false, scaleMatrix);

// 改变视角 
let viewMatrix = mat4.create();
let eye = [0.2, 0.0, 0.5];
let center = [0, 0, 0];
let up = [0, 1, 0];
mat4.lookAt(viewMatrix, eye, center, up);
// 获取
let u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix');
gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix);
draw(gl);

window.onkeydown = function (e) {
    let step = 0.01;
    if (e.keyCode === 37) { // 左
        eye[0] -= step;
    } else if (e.keyCode === 39) { // 右
        eye[0] += step;
    } else if (e.keyCode === 38) {//上
        eye[1] += step;
    } else if (e.keyCode === 40) {//下
        eye[1] -= step;
    }
    mat4.lookAt(viewMatrix, eye, center, up);
    gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix);
    draw(gl);


}



function initBuffers(gl) {
    let vertices = new Float32Array([
        -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
        0.0, 0.5, 0.0, 0.0, 0.0, 1.0
    ]);
    let F_SIZE = vertices.BYTES_PER_ELEMENT;


    // 创建buffer
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    let a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, F_SIZE * 6, 0)
    gl.enableVertexAttribArray(a_position);

    let a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, F_SIZE * 6, F_SIZE * 3);
    gl.enableVertexAttribArray(a_color);

}



function draw(gl) {
    // 清除画布
    gl.clearColor(0.3, 0.4, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);

    // 前面的颜色遮住后面
    gl.enable(gl.DEPTH_TEST);

}
