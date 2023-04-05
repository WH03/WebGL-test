import initShaders from './initShaders.js';

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

let vertexShader = `
    attribute vec2 a_position;
    uniform float u_size;
    varying vec2 v_xx;
    void main(){
        v_xx = a_position;
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = u_size;
    }
`

let fragmentShader = `
    // 告诉webgl填色的时候的精度
    precision mediump float;
    uniform vec3 u_color;

    varying vec2 v_xx;
    void main(){
        // gl_FragColor = vec4(u_color,1.0);
        gl_FragColor = vec4(v_xx,0.5,1.0);
    }
`;

initShaders(gl, vertexShader, fragmentShader);

// 清除缓冲区颜色
gl.clearColor(0.0, 0.0, 0.0, 0.5);
gl.clear(gl.COLOR_BUFFER_BIT);

/*  1、attribute将数据传入到vertexShader：将js中数据传入到vertexShader中
    2、Uniform 可传入vertexShader和fragmentShader中：将js中的数据传入到vertexShader/fragmentShader中
    3、varying：将vertexShader中数据传到到fragmentShader
*/
// 1、attribute方式
let a_position = gl.getAttribLocation(gl.program, 'a_position');
gl.vertexAttrib1f(a_position, 0.5, 0.5);

// 2、Uniform
let u_color = gl.getUniformLocation(gl.program, 'u_color');
gl.uniform3f(u_color, 0.0, 1.0, 1.0);

let u_size = gl.getUniformLocation(gl.program, 'u_size');
gl.uniform1f(u_size, 50.0);

// 3、varying


gl.drawArrays(gl.POINTS, 0, 1);