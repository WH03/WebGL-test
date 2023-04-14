// 引入包
import initShaders from './initShaders.js'

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

let vertexShader = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main(){
        v_color = a_color;
        gl_Position = vec4(a_position,1.0);
        gl_PointSize= 10.0;
    }
`;

let fragmentShader = `
    precision mediump float;
    varying vec3 v_color;
    void main(){
        gl_FragColor = vec4(v_color,1.0);
    }
`
initShaders(gl, vertexShader, fragmentShader);

initBuffers(gl);

function initBuffers(gl) {
    let vertices = new Float32Array([-0.5, 0.5, 0.0, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
            0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
            0.5, 0.5, 0.0, 1.0, 1.0, 1.0,
        ])
        // let F_SIZE = gl.BYTES_PRE_ELEMENT;
    let F_SIZE = vertices.BYTES_PER_ELEMENT

    let a_position = gl.getAttribLocation(gl.program, 'a_position');

    // 创建buffer
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 6 * F_SIZE, 0);
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, F_SIZE * 6, 0)
    gl.enableVertexAttribArray(a_position);


    let a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 6 * F_SIZE, 3 * F_SIZE)
    gl.enableVertexAttribArray(a_color);
}

draw(gl)

function draw(gl) {
    // 清除画布
    gl.clearColor(0.3, 0.4, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
    gl.drawArrays(gl.POINTS, 0, 4)
}



/* ********************************** */

// // 引入包
// import initShaders from './initShaders.js'

// let canvas = document.querySelector('#webgl');
// let gl = canvas.getContext('webgl');

// let vertexShader = `
//     attribute vec3 a_position;
//     attribute vec3 a_color;
//     varying vec3 v_color;
//     void main(){
//         v_color = a_color;
//         gl_Position = vec4(a_position,1.0);
//         gl_PointSize= 10.0;
//     }
// `;

// let fragmentShader = `
//     precision mediump float;
//     varying vec3 v_color;
//     uniform float u_w;
//     uniform float u_h;
//     // gl_FragCoord:canvas画布的坐标
//     void main(){
//         // gl_FragColor = vec4(v_color,1.0);
//         // gl_FragColor = vec4(gl_FragCoord.x / u_w, gl_FragCoord.y / u_h,0.0，1.0);
//         gl_FragColor = vec4(gl_FragCoord.x / u_w, gl_FragCoord.y / u_h, 0.0, 1.0);
//     }
// `
// initShaders(gl, vertexShader, fragmentShader);

// let canvas_w = 600,
//     canvas_h = 600;
// let u_w = gl.getUniformLocation(gl.program, 'u_w');
// let u_h = gl.getUniformLocation(gl.program, 'u_h');
// gl.uniform1f(u_w, canvas_w);
// gl.uniform1f(u_h, canvas_h);





// initBuffers(gl);

// function initBuffers(gl) {
//     let vertices = new Float32Array([-0.5, 0.5, 0.0, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
//         0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
//         0.5, 0.5, 0.0, 1.0, 1.0, 1.0,
//     ])
//     let F_SIZE = vertices.BYTES_PER_ELEMENT

//     let a_position = gl.getAttribLocation(gl.program, 'a_position');

//     // 创建buffer
//     let buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
//     // gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 6 * F_SIZE, 0);
//     gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, F_SIZE * 6, 0)
//     gl.enableVertexAttribArray(a_position);


//     let a_color = gl.getAttribLocation(gl.program, 'a_color');
//     gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 6 * F_SIZE, 3 * F_SIZE)
//     gl.enableVertexAttribArray(a_color);
// }

// draw(gl)

// function draw(gl) {
//     // 清除画布
//     gl.clearColor(0.3, 0.4, 0.5, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
//     gl.drawArrays(gl.POINTS, 0, 4)
// }