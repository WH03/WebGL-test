import initShaders from './initShaders.js';

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

let vertexShader = `
    attribute vec2 a_position;
    void main(){
        gl_Position = vec4(a_position,0.0,1.0);
    }
`

let fragmentShader = `
    // 告诉webgl填色的时候的精度
    precision mediump float;
    void main(){
        gl_FragColor = vec4(1.0,0.0,0.5,1.0);
    }
`;

initShaders(gl, vertexShader, fragmentShader);

// 清除缓冲区颜色
gl.clearColor(0.0, 0.0, 0.0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

let vertices = [-0.5, 0.0,
    0.5, 0.0,
    0.0, 0.5,
];
vertices = new Float32Array(vertices);

/* 
    !创建buffer的五个步骤
        !1、
*/
// 1、
let buffer = gl.createBuffer();

// 2、绑定buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// 3、
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 4、把带有数据的buffer赋值给attribute
let a_position = gl.getAttribLocation(gl.program, 'a_position');
gl.vertexAttribPointer(
    a_position,
    2, //vertices中每一组两个数
    gl.FLOAT,
    false,
    0,
    0
);
// 5、确认赋值
gl.enableVertexAttribArray(a_position);








gl.drawArrays(gl.TRIANGLES, 0, 3);