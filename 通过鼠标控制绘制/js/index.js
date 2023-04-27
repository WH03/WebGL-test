// let canvas = document.querySelector('#webgl');
// let gl = canvas.getContext('webgl');

// // 着色器相关代码
// let vertexSource = `
//     void main(){
//         //设置定点位置 （坐标原点）
//         gl_Position = vec4(0.0,0.0,0.0,1.0);
//         //设置点的大小（10px）  
//         gl_PointSize= 30.0;
//     }
// `;

// let fragmentSource = `
//     void main(){
//         // 设置片元颜色 rbga
//         gl_FragColor = vec4(1.0,0,0,1.0);
//     }
// `;

// /*  
//     1、创建shader:
//         (1)、调用 WebGLRenderingContext 的 createShader 方法，创建一个 WebGLShader 对象
//         (2)、type 有两种类型，分别是 gl.VERTEX_SHADER 和 gl.FRAGMENT_SHADER 
// */
// let vertexShader = gl.createShader(gl.VERTEX_SHADER);
// let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

// // 2、挂载 glsl 源码  向着色器对象中填充着色器程序源代码
// gl.shaderSource(vertexShader, vertexSource);
// gl.shaderSource(fragmentShader, fragmentSource);

// /* 
//     3、编译shader，获取编译 shader 的状态，是否编译成功了。
//     这个方法可以还能获取shader 的一些别的信息，比如是否已经将 shader 删除，shader 的类型等等，具体可以参考下面的链接：
//   https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getShaderParameter

// */
// gl.compileShader(vertexShader);
// gl.compileShader(fragmentShader);

// //4、调用 createProgram api 创建一个 WebGLProgram 对象
// let program = gl.createProgram();

// /* 
//    5、把shader何在一起 合成webgl程序，给 WebGLProgram 对象关联上两种着色器
//     program可能有多个,指定是哪个program 
// */
// gl.attachShader(program, vertexShader);
// gl.attachShader(program, fragmentShader);

// // 6、链接一个给定的 WebGLProgram 到已附着的顶点着色器和片段着色器。
// gl.linkProgram(program);
// //7、使用程序对象
// gl.useProgram(program);

// /*
//     清除颜色缓冲区  设置背景色gl.clearColor()
//     在清空绘图区之前需要设置背景色。一旦指定了背景色后，背景色就会驻存在WebGL系统中，在下次调用gl.clearColor()方法前不会改变 
// */
// gl.clearColor(0, 0, 0, 0.5);
// gl.clear(gl.COLOR_BUFFER_BIT);

// // 画一个点
// gl.drawArrays(gl.POINTS, 0, 1);


// **********************************************

import initShaders from './initShaders.js';

let canvas = document.querySelector('#webgl');
let gl = canvas.getContext('webgl');

let vertexShader = `
    attribute vec4 a_position;
    void main(){
        gl_Position = a_position;
        gl_PointSize = 10.0;
    }
`;

let fragmentShader = `
    void main(){
        // 设置片元颜色 rbga
        gl_FragColor = vec4(1.0,0.6,1.0,1.0);
    }
`;

initShaders(gl, vertexShader, fragmentShader);

// 清除填充区颜色
gl.clearColor(0.0, 0.0, 0.0, 0.5);
gl.clear(gl.COLOR_BUFFER_BIT);

let a_position = gl.getAttribLocation(gl.program, 'a_position');

// // 在点击位置创建点
// canvas.onclick = function (ev) {
//     // 当前点击距离顶部和左边的坐标：
//     const x = ev.clientX;
//     const y = ev.clientY;
//     // console.log('x:',x)
//     // console.log('y:',y)
//     // 当前元素的坐标
//     const domPosition = ev.target.getBoundingClientRect();
    
//     // console.log(domPosition)
//     // 当前点击在canvas画布上的坐标
//     const domX = x - domPosition.left;
//     const domY = y - domPosition.top;
//     /*  
//         将canvas坐标转换成webgl坐标：
//             先减去画布宽、高的一半，在除以画布宽高的一半，得到webgl的坐标，从-1到1。
//     */
//     const helfWidth = canvas.offsetWidth / 2;
//     const helfHeight = canvas.offsetHeight / 2;

//     const clickX = (domX - helfWidth) / helfWidth;
//     const clickY = (helfHeight - domY) / helfHeight;
//     // console.log(clickX, clickY);

//     gl.vertexAttrib2f(a_position, clickX, clickY)
//     // 画一个点
//     gl.drawArrays(gl.POINTS, 0, 1);
// }

// // 鼠标跟随效果
// canvas.onmousemove = function (ev) {
//     // 坐标
//     const x = ev.clientX;
//     const y = ev.clientY;

//     const domPosition = ev.target.getBoundingClientRect();
//     const domX = x - domPosition.left;
//     const domY = y - domPosition.top;
//     const helfWidth = canvas.offsetWidth / 2;
//     const helfHeight = canvas.offsetHeight / 2;


//     const clickX = (domX - helfWidth) / helfWidth;
//     const clickY = (helfHeight - domY) / helfHeight;
//     console.log(clickX, clickY);

//     gl.vertexAttrib2f(a_position,clickX,clickY)
//     // 画一个点
//     gl.drawArrays(gl.POINTS, 0, 1);
// }

// 移动鼠标画线
let points = [];
canvas.onmousemove = function (ev) {
    // 坐标
    const x = ev.clientX;
    const y = ev.clientY;

    const domPosition = ev.target.getBoundingClientRect();
    const domX = x - domPosition.left;
    const domY = y - domPosition.top;
    const helfWidth = canvas.offsetWidth / 2;
    const helfHeight = canvas.offsetHeight / 2;


    const clickX = (domX - helfWidth) / helfWidth;
    const clickY = (helfHeight - domY) / helfHeight;
    console.log(clickX, clickY);
    points.push({
        clickX,
        clickY
    });

    for (let i = 0; i < points.length; i++) {
        gl.vertexAttrib2f(a_position, points[i].clickX, points[i].clickY)
        // 画一个点
        gl.drawArrays(gl.POINTS, 0, 1);

    }

}