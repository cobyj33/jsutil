export declare function compileShader(gl: WebGL2RenderingContext, type: WebGL2RenderingContext["VERTEX_SHADER"] | WebGL2RenderingContext["FRAGMENT_SHADER"], source: string): WebGLShader;
export interface WebGLInfoLog {
    status: boolean;
    log: string;
}
export declare function testShaderCompilation(gl: WebGL2RenderingContext, shader: WebGLShader): WebGLInfoLog;
export declare function testProgramLinking(gl: WebGL2RenderingContext, program: WebGLProgram): WebGLInfoLog;
export declare function compileProgram(gl: WebGL2RenderingContext, vertex: WebGLShader, fragment: WebGLProgram): WebGLProgram;
export declare function fillBufferData(gl: WebGL2RenderingContext, bufferType: number, buffer: WebGLBuffer, data: BufferSource): void;
export declare function createVertexBuffer(gl: WebGL2RenderingContext, data: number[]): WebGLBuffer;
export declare function createElementArrayBuffer(gl: WebGL2RenderingContext, data: number[]): WebGLBuffer;
export declare function compileProgramFromFiles(gl: WebGL2RenderingContext, vPath: string, fPath: string): Promise<WebGLProgram>;
export declare function compileProgramFromSourceStrings(gl: WebGL2RenderingContext, vSource: string, fSource: string): WebGLProgram;
declare const _default: {
    compileShader: typeof compileShader;
    compileProgram: typeof compileProgram;
    compileProgramFromFiles: typeof compileProgramFromFiles;
    compileProgramFromSourceStrings: typeof compileProgramFromSourceStrings;
    createElementArrayBuffer: typeof createElementArrayBuffer;
    createVertexBuffer: typeof createVertexBuffer;
    fillBufferData: typeof fillBufferData;
    testShaderCompilation: typeof testShaderCompilation;
    testProgramLinking: typeof testProgramLinking;
};
export default _default;
//# sourceMappingURL=webgl.d.ts.map