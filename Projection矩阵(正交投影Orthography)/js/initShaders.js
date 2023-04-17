export default function initShaders(gl, vertexSource, fragmentSource) {

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    //创建程序
    let program = createProgram(gl, vertexShader, fragmentShader);
    if (program) {
        //启动程序对象
        gl.useProgram(program);
        // 为了获取program的作用域，所以把它挂载在gl对象上，作为一个属性
        gl.program = program;
        return true
    } else {
        return false
    }
}

// 创建shader
function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    //将着色器源文件传入着色器对象中
    gl.shaderSource(shader, source);
    // 编译着色器对象
    gl.compileShader(shader);

    // 错误处理
    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (compiled) {
        return shader;
    } else {
        let error = gl.getShaderInfoLog(shader);
        console.log("compile shaders error:", error);
        return null;
    }
}

function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    if (!program) return null;
    //把片元着色对象装进程序对象中
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    //连接webgl上下文对象和程序对象
    gl.linkProgram(program);

    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (linked) {

        return program;
    } else {
        let error = gl.getProgramInfoLog(program);
        console.log("link program error:", error);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }

}