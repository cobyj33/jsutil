"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileProgramFromSourceStrings = exports.compileProgramFromFiles = exports.createElementArrayBuffer = exports.createVertexBuffer = exports.fillBufferData = exports.compileProgram = exports.testProgramLinking = exports.testShaderCompilation = exports.compileShader = void 0;
function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (shader !== null && shader !== undefined) {
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === true) {
            return shader;
        }
        throw new Error(`could not compile shader: ${gl.getShaderInfoLog(shader)}`);
    }
    throw new Error(`Could not create webgl shader of type ${type}  `);
}
exports.compileShader = compileShader;
function testShaderCompilation(gl, shader) {
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success === false) {
        return {
            status: false,
            log: gl.getShaderInfoLog(shader) || ""
        };
    }
    return {
        status: true,
        log: ""
    };
}
exports.testShaderCompilation = testShaderCompilation;
function testProgramLinking(gl, program) {
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success === false) {
        return {
            status: false,
            log: gl.getProgramInfoLog(program) || ""
        };
    }
    return {
        status: true,
        log: ""
    };
}
exports.testProgramLinking = testProgramLinking;
function compileProgram(gl, vertex, fragment) {
    const program = gl.createProgram();
    if (program !== null && program !== undefined) {
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success === true) {
            return program;
        }
        throw new Error(` Could not link program: ${gl.getProgramInfoLog(program)} `);
    }
    throw new Error(`Could not create WebGL Program object`);
}
exports.compileProgram = compileProgram;
function fillBufferData(gl, bufferType, buffer, data) {
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, data, gl.STATIC_DRAW);
    gl.bindBuffer(bufferType, null);
}
exports.fillBufferData = fillBufferData;
function createVertexBuffer(gl, data) {
    const vBuf = gl.createBuffer();
    if (vBuf !== null && vBuf !== undefined) {
        fillBufferData(gl, gl.ARRAY_BUFFER, vBuf, new Float32Array(data));
        return vBuf;
    }
    throw new Error(`Failed to create WebGL Vertex Buffer from data ${data}`);
}
exports.createVertexBuffer = createVertexBuffer;
function createElementArrayBuffer(gl, data) {
    const eBuf = gl.createBuffer();
    if (eBuf !== null && eBuf !== undefined) {
        fillBufferData(gl, gl.ELEMENT_ARRAY_BUFFER, eBuf, new Uint16Array(data));
        return eBuf;
    }
    throw new Error(`Failed to create WebGL Element Array Buffer from data ${data}`);
}
exports.createElementArrayBuffer = createElementArrayBuffer;
async function compileProgramFromFiles(gl, vPath, fPath) {
    const vertexShaderSource = await fetch(vPath).then(res => res.text());
    const fragmentShaderSource = await fetch(fPath).then(res => res.text());
    return compileProgramFromSourceStrings(gl, vertexShaderSource, fragmentShaderSource);
}
exports.compileProgramFromFiles = compileProgramFromFiles;
function compileProgramFromSourceStrings(gl, vSource, fSource) {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fSource);
    return compileProgram(gl, vertexShader, fragmentShader);
}
exports.compileProgramFromSourceStrings = compileProgramFromSourceStrings;
exports.default = {
    compileShader,
    compileProgram,
    compileProgramFromFiles,
    compileProgramFromSourceStrings,
    createElementArrayBuffer,
    createVertexBuffer,
    fillBufferData,
    testShaderCompilation,
    testProgramLinking
};
