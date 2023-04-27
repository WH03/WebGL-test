export default function initShaders(gl, vertexSource, fragmentSource) {
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    let program = createProgram(gl, vertexShader, fragmentShader);

    if (program) {
        gl.useProgram(program);
        // 为了获得program的作用域，所以把它挂在gl对象上，作为一个属性
        gl.program = program;
        return true;
    } else {
        console.log('Failed to create program');
        return false;
    }
};

function createShader(gl, type, source) {
    // 1、创建着色器；
    let shader = gl.createShader(type);
    // 2、向着色器对象中填充着色器程序源码
    gl.shaderSource(shader, source);
    // 3、编译着色器
    gl.compileShader(shader);

    // 编译错误处理
    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (compiled) {
        return shader;
    } else {
        let error = gl.getShaderInfoLog(shader);
        console.log('compile shaders error:', error);
        // 如果错误，删除shader，避免内存泄漏
        gl.deleteShader(shader);
        return null;
    };
};

function createProgram(gl, vertexShader, fragmentShader) {
    // 4、创建程序对象
    let program = gl.createProgram();
    // 5、为程序对象分配着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // 6、连接程序对象
    gl.linkProgram(program);
    // 判断link是否出错
    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (linked) {
        return program;
    } else {
        let error = gl.getProgramInfoLog(program, gl.LINK_STATUS);
        console.log('link program error:', error);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    };
}