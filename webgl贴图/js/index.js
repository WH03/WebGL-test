// 引入包
import initShaders from './initShaders.js'

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

let vertexShader = `
    attribute vec3 a_position;
    attribute vec2 a_uv;
    varying vec2 v_uv;
    void main(){
        v_uv = a_uv;
        gl_Position = vec4(a_position,1.0);
        // gl_PointSize= 10.0;
    }
`;

let fragmentShader = `
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_sampler; 
    void main(){
        vec4 color = texture2D(u_sampler,v_uv);
        gl_FragColor = color;
    }
`
initShaders(gl, vertexShader, fragmentShader);

initBuffers(gl);
initTextures(gl);

function initTextures(gl) {
    // 翻转图片的y轴,默认是不翻转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    let texture = gl.createTexture();
    let u_sampler = gl.getUniformLocation(gl.program, 'u_sampler');

    let image = new Image();
    image.src = './imgs/cat_512x512.jpg';
    // 异步的过程：图片加载完之后执行这个函数的任务
    image.onload = function() {
        // 激活图片，放在第0个单元上边
        gl.activeTexture(gl.TEXTURE0);
        //绑定贴图
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // gl.texParameteri(贴图的种类、名称、具体值):对贴图的参数进行设置
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // 贴图用哪张图片，即用image作为texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.uniform1i(u_sampler, 0);
        draw(gl);
    }

}


function initBuffers(gl) {
    let vertices = new Float32Array([-0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
    ]);

    let uvs = new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ]);

    // let F_SIZE = gl.BYTES_PRE_ELEMENT;
    let F_SIZE = vertices.BYTES_PER_ELEMENT

    let a_position = gl.getAttribLocation(gl.program, 'a_position');
    let a_uv = gl.getAttribLocation(gl.program, 'a_uv');

    // 创建buffer
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, F_SIZE * 3, 0)
    gl.enableVertexAttribArray(a_position);


    // 贴图buffer
    let uvsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, F_SIZE * 2, 0)
    gl.enableVertexAttribArray(a_uv);
}



function draw(gl) {
    // 清除画布
    gl.clearColor(0.3, 0.4, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
    gl.drawArrays(gl.POINTS, 0, 4)
}