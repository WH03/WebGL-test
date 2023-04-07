import initShaders from './initShaders.js';

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

let vertexShader = `
    attribute vec2 a_position;
     attribute vec3 a_color;
     varying vec3 v_color;
    void main(){
        v_color = a_color;
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = 10.0;
    }
`;
let fragmentShader = `
    // 告诉webgl填色的时候的精度
    precision mediump float;
     varying vec3 v_color;
    void main(){
        // gl_FragColor = vec4(0.4,0.7,0.3,1.0);
        gl_FragColor = vec4(v_color,1.0);
    }
`;

initShaders(gl, vertexShader, fragmentShader);

// 清除缓冲区颜色
gl.clearColor(0.0, 0.0, 0.0, 0.5);
gl.clear(gl.COLOR_BUFFER_BIT);

// 获取a_position和v_color
let a_position = gl.getAttribLocation(gl.program, 'a_position');
let a_color = gl.getAttribLocation(gl.program, 'a_color');

// 随机生成n个点
// let n = 100;
// let vertices = [];
// for (let i = 0; i < n; i++) {
//     let x = (Math.random() - 0.5) * 2;
//     let y = (Math.random() - 0.5) * 2;
//     let r = (Math.random() - 0.5) * 2;
//     let g = (Math.random() - 0.5) * 2;
//     let b = (Math.random() - 0.5) * 2;
//     vertices.push(x, y, r, g, b);
// }
// console.log(vertices);

// 画一个圆
let n = 100;
// 半径
let R = 0.8;
let vertices = [];
for (let i = 0; i < n; i++) {
    let deg = 2 * Math.PI / n * i;
    let x = Math.cos(deg) * R
    let y = Math.sin(deg) * R;

    let r = (Math.random() - 0.5) * 2;
    let g = (Math.random() - 0.5) * 2;
    let b = (Math.random() - 0.5) * 2;
    vertices.push(x, y, r, g, b);
}

// let vertices = [
//     -0.5, 0.5, 1.0, 0.5, 0.1,
//     -0.5, -0.5, 0.3, 0.2, 0.8,
//     0.5, -0.5, 0.2, 0.6, 0.2,
//     0.5, 0.5, 0.2, 0.6, 0.2
// ]
vertices = new Float32Array(vertices);
let F_SIZE = vertices.BYTES_PER_ELEMENT;

//1、创建buffer
let buffer = gl.createBuffer();

// 绑定buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 3、向buffer传数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
// 4、将缓冲区对象分配给 attribute对象
gl.vertexAttribPointer(
    a_position,
    2,
    gl.FLOAT,
    false,
    5 * F_SIZE,
    0
);

gl.vertexAttribPointer(
    a_color,
    3,
    gl.FLOAT,
    false,
    5 * F_SIZE,
    2 * F_SIZE,
);

// 5、确认赋值
gl.enableVertexAttribArray(a_position);
gl.enableVertexAttribArray(a_color);


// gl.drawArrays(gl.POINTS, 0, n);
// 画线
// gl.drawArrays(gl.LINES, 0, n);
// 连接线
// gl.drawArrays(gl.LINE_STRIP, 0, n);
// 收尾
gl.drawArrays(gl.LINE_LOOP, 0, n);
// gl.drawArrays(gl.TRIANGLES, 0, n);
gl.drawArrays(gl.TRIANGLE_FAN, 0, n);