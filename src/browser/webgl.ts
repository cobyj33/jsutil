
export interface WebGLInfoLog {
    status: boolean
    log: string
}

/**
 * @brief test the compilation of a WebGLShader in a WebGL2RenderingContext
 * @param gl WebGL2RenderingContext
 * @param program The WebGLShader to test the linking of
 * @returns An object with a status boolean and log string, where the log string contains any errors if the compilation was not a success
 */
export function testWebGLShaderCompilation(gl: WebGL2RenderingContext, shader: WebGLShader): WebGLInfoLog {
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    return {
        status: success,
        log: success ? "" : (gl.getShaderInfoLog(shader) || "Could not get Shader Info Log of failed Shader Compilation")
    }
}

/**
 * @brief test the linkage of a WebGLProgram in a WebGL2RenderingContext
 * @param gl WebGL2RenderingContext
 * @param program The WebGL Program to test the linking of
 * @returns An object with a status boolean and log string, where the log string contains any errors if the linking was not a success
 */
export function testWebGLProgramLinking(gl: WebGL2RenderingContext, program: WebGLProgram): WebGLInfoLog {
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    return {
        status: success,
        log: success ? "" : (gl.getProgramInfoLog(program) || "Could not get Shader Info Log of failed Shader Compilation")
    }
}

/**
 * @brief compile a WebGLShader from a given source string
 * @param gl WebGL2RenderingContext
 * @param type Either WebGL2RenderingContext.VERTEX_SHADER or WebGL2RenderingContext.FRAGMENT_SHADER
 * @param source The source string to compile the WebGLShader from
 * @returns A compiled WebGLShader
 */
export function compileWebGLShader(gl: WebGL2RenderingContext, type: WebGL2RenderingContext["VERTEX_SHADER"] | WebGL2RenderingContext["FRAGMENT_SHADER"], source: string): WebGLShader {
    const shader = gl.createShader(type)
    if (shader !== null && shader !== undefined) {
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        const { status, log } = testWebGLShaderCompilation(gl, shader)
        if (status) {
            return shader
        }
        throw new Error(`Could not compile shader: ${log}`);
    }
    throw new Error(`Could not create webgl shader of type ${ type }`)
}

/**
 * @brief Compiles a WebGLProgram object and links it to the given vertex and fragment shaders
 * @param gl 
 * @param vertex The vertex shader to attach to the returned WebGLProgram
 * @param fragment The fragment shader to attach to the returned WebGLProgram
 * @returns A compiled WebGLProgram with the attached vertex and fragment shaders
*/
export function compileWebGLProgram(gl: WebGL2RenderingContext, vertex: WebGLShader, fragment: WebGLShader): WebGLProgram {
    const program = gl.createProgram()
    if (program !== null && program !== undefined) {
        gl.attachShader(program, vertex)
        gl.attachShader(program, fragment)
        gl.linkProgram(program)
        const { status, log } = testWebGLProgramLinking(gl, program)
        if (status) {
            return program
        }
        throw new Error(`Could not link WebGL program: ${log} `)
    }
    throw new Error(`Could not create WebGL Program object`)
}

/**
 * Binds and fills a given WebGL Buffer with data
 * 
 * @note The given buffer type is unbinded after calling this function. 
 * If there was anything previously binded to the provided buffer type, it will be unbinded from the given WebGL2Rendering context
 * 
 * @param gl WebGL2 Rendering Context
 * @param bufferType As of now, either WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER or WebGL2RenderingContext.ARRAY_BUFFER
 * @param buffer The WebGL buffer to fill
 * @param data The Buffer data to fill the WebGL buffer with
 */
export function fillWebGLBufferData(gl: WebGL2RenderingContext, bufferType: WebGL2RenderingContext["ELEMENT_ARRAY_BUFFER"] | WebGL2RenderingContext["ARRAY_BUFFER"], buffer: WebGLBuffer, data: BufferSource) {
    gl.bindBuffer(bufferType, buffer)
    gl.bufferData(bufferType, data, gl.STATIC_DRAW)
    gl.bindBuffer(bufferType, null)
}

export function createWebGLVertexBuffer(gl: WebGL2RenderingContext, data: Float32Array): WebGLBuffer {
    const vBuf = gl.createBuffer()
    if (vBuf !== null && vBuf !== undefined) {
        fillWebGLBufferData(gl, gl.ARRAY_BUFFER, vBuf, data)
        return vBuf
    }
    throw new Error(`Failed to create WebGL Vertex Buffer from data ${data}`)
}

export function createWebGLElementArrayBuffer(gl: WebGL2RenderingContext, data: Uint16Array) {
    const eBuf = gl.createBuffer()
    if (eBuf !== null && eBuf !== undefined) {
        fillWebGLBufferData(gl, gl.ELEMENT_ARRAY_BUFFER, eBuf, data)
        return eBuf
    }
    throw new Error(`Failed to create WebGL Element Array Buffer from data ${data}`)
}

export async function compileWebGLProgramFromFiles(gl: WebGL2RenderingContext, vPath: string, fPath: string): Promise<WebGLProgram> {
    const vertexShaderSource = await fetch(vPath).then(res => res.text())
    const fragmentShaderSource = await fetch(fPath).then(res => res.text())
    return compileWebGLProgramFromSourceStrings(gl, vertexShaderSource, fragmentShaderSource)
}


export function compileWebGLProgramFromSourceStrings(gl: WebGL2RenderingContext, vSource: string, fSource: string): WebGLProgram {
    const vertexShader = compileWebGLShader(gl, gl.VERTEX_SHADER, vSource)
    const fragmentShader = compileWebGLShader(gl, gl.FRAGMENT_SHADER, fSource)
    return compileWebGLProgram(gl, vertexShader, fragmentShader)
}

export default {
    compileWebGLShader,
    compileWebGLProgram,
    compileWebGLProgramFromFiles,
    compileWebGLProgramFromSourceStrings,
    createWebGLElementArrayBuffer,
    createWebGLVertexBuffer,
    fillWebGLBufferData,
    testWebGLShaderCompilation,
    testWebGLProgramLinking
  }