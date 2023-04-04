let canvas = document.getElementById('webgl');
let gl = canvas.getContext('webgl');

// 创建两个shader
let vertexSource = `
    void main(){
        gl_Position = vec4(0.0,0.0,0.0,1.0);
        gl_PointSize = 10.0;
    }
`
let fragmentSource = `
    void main(){
        gl_FragColor = vec4(1.0,1.0,0.0,1.0);
    }
`
initShaders();
function initShaders() {
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    createProgram(gl, vertexShader, fragmentShader);
}

//创建shader
function createShader(gl, type, source) {
    let shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (compiled) {
        return shader
    }
    let error = gl.getShaderInfoLog(error);
    gl.deleteShader(shader);
    console.log("compile shader error:", error);
    return null;
}

// 创建程序
function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();

    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (linked) {
        gl.useProgram(program);
        return program;
    } else {
        let error = gl.getProgramInfoLog(program);
        console.log("link program error:", error);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader)
        return null;
    }
}





// 指定将要用来清空绘图区颜色(声明颜色 rgba) 颜色对应 0-1[0,1] 1相当于css[0,255]  255
// 清除颜色缓冲区
gl.clearColor(0.5, 0.5, 0.5, 1.0);
// 大写表示常量   
// 清空颜色缓冲区
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 5, 5);