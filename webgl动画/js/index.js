// 引入封装好的包
import initShaders from './initShaders.js'

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

// 创建定点着色器
let vertexShader = `
    attribute vec2 a_position;
    uniform vec4 u_translate;
    void main(){
        gl_Position = vec4(a_position,0.0,1.0) + u_translate;
        gl_PointSize=10.0;
    }
`;

let fragmentShader = `
    precision mediump float;
    void main(){
        gl_FragColor= vec4(0.0,0.5,0.1,1.0);
    }
`;

initShaders(gl, vertexShader, fragmentShader);

initvertexBuffers(gl);

function initvertexBuffers(gl) {
    let vertices = [
        // x  y
        -0.5, -0.5,
        0.5, -0.5, 0.0, 0.5
    ];
    vertices = new Float32Array(vertices);
    let F_SIZE = vertices.BYTES_PER_ELEMENT;
    let a_position = gl.getAttribLocation(gl.program, 'a_position');

    /* 
        创建buffer
    */
    // 1、创建buffer
    let buffer = gl.createBuffer();
    // 2、绑定buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // 3、向buffer传递数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 4、将缓冲区对象赋值给attribute
    gl.vertexAttribPointer(
        a_position,
        2,
        gl.FLOAT,
        false,
        2 * F_SIZE,
        0
    );
    // 5、确认赋值
    gl.enableVertexAttribArray(a_position);
};



function draw(gl) {
    // 清除画布
    gl.clearColor(0.2, 0.2, 0.2, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT);
    let n = 3;
    // 画线
    gl.drawArrays(gl.POINTS, 0, n);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);

}

let tx = 0,
    ty = 0;
let speed_x = 0.01,
    speed_y = 0.02;
// 动画函数
function animate() {
    tx += speed_x;
    ty += speed_y;
    if (tx > 0.5 || tx < -0.5) {
        speed_x *= -1;
    };
    if (ty > 0.5 || ty < -0.5) {
        speed_y *= -1
    }
    let u_translate = gl.getUniformLocation(gl.program, 'u_translate');
    gl.uniform4f(u_translate, tx, ty, 0.0, 0.0);
    draw(gl);
    requestAnimationFrame(animate);
}
animate();