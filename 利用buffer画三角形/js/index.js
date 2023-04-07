// import initShaders from './initShaders.js';

// let canvas = document.querySelector('#webgl');
// let gl = canvas.getContext('webgl');

// let vertexShader = `
//     attribute vec2 a_position;
//     void main(){
//         gl_Position = vec4(a_position,0.0,1.0);
//     }
// `

// let fragmentShader = `
//     // 告诉webgl填色的时候的精度
//     precision mediump float;
//     void main(){
//         gl_FragColor = vec4(1.0,0.0,0.5,1.0);
//     }
// `;

// initShaders(gl, vertexShader, fragmentShader);

// // 清除缓冲区颜色
// gl.clearColor(0.0, 0.0, 0.0, 1);
// gl.clear(gl.COLOR_BUFFER_BIT);

// let vertices = [
//     //坐标
//     -0.5, 0.0, 
//     0.5, 0.0, 
//     0.0, 0.5, 
// ];
// vertices = new Float32Array(vertices);

// /* 
//     !创建buffer的五个步骤
//         !1、创建buffer：gl.createBuffer()
//         2、绑定buffer：gl.bindBuffer()
//         3、向缓冲区写入对象数据：gl.getAttribLocation()
//         4、将缓冲区对象分配给attribute变量：gl.vertexAttribPointer()
//         5、确认赋值：gl.enableVertexAttribArray();

// */

// // 1、创建buffer
// let buffer = gl.createBuffer();

// // 2、绑定buffer
// gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// // 3、向缓冲区对象写入数据
// gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// // 把带有数据的buffer赋值给attribute
// let a_position = gl.getAttribLocation(gl.program, 'a_position');
// /*  告诉显卡从当前绑定的缓冲区（bindBuffer()指定的缓冲区）中读取顶点数据。
//     语法：void gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
//  */

// //4、 将缓冲区对象分配给attribute变量
// gl.vertexAttribPointer(
//     a_position,     //待分配的attribute变量的存储地址
//     2,              //缓冲区中每个顶点的分量个数（1~4）  案例中vertices中每一组 两个数
//     gl.FLOAT,       //浮点型，Float32Array
//     false,          //传入true或false，表明是否非浮点型的数据归一化到[0,1]或[-1,1]区间
//     0,              //指定相邻两个顶点间的字节数，默认为0
//     0               //指定缓冲区对象中的偏移量（以字节为单位），即attribute变量从缓冲区的何处开始存储，0代表起始位置
// );
// // 5、确认赋值
// gl.enableVertexAttribArray(a_position);

// // 画三角形  
// gl.drawArrays(gl.TRIANGLES, 0, 3);

/******************************************/
// 创建带颜色的三角形
// 引入封装好的包
import initShaders from './initShaders.js'

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');
// 创建vertexShader
let vertexShader = `
    attribute vec2 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main(){
        v_color=a_color;
       gl_Position = vec4(a_position,0.0,1.0);
    }
`
// 创建fragmentShader
let fragmentShader = `
    precision mediump float;
    varying vec3 v_color;
    void main(){
        gl_FragColor = vec4(v_color,1.0);
    }
`
// 调用封装的初始化函数
initShaders(gl, vertexShader, fragmentShader);

//清除缓冲区颜色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


// 创建数据
let vertices = [
    // 坐标和颜色 x   y    r    g    b
    -0.5, 0.0, 1.0, 0.0, 0.0,
    0.5, 0.0, 0.0, 1.0, 0.0,
    0.0, 0.8, 0.0, 0.0, 1.0
]
vertices = new Float32Array(vertices);
let F_SIZE = vertices.BYTES_PER_ELEMENT;


// 1、创建buffer
let buffer = gl.createBuffer();
// 2、绑定buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 3、向定点缓冲区写入数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
// 把带有buffer的数据赋值给attribute
let a_position = gl.getAttribLocation(gl.program, 'a_position');
let a_color = gl.getAttribLocation(gl.program, 'a_color');
// 4、将缓冲区对象分配给attribute变量  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
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
    2 * F_SIZE
);

// 5、确认赋值
gl.enableVertexAttribArray(a_position);
gl.enableVertexAttribArray(a_color);

gl.drawArrays(gl.TRIANGLES, 0, 3);
