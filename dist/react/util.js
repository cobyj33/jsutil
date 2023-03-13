"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCanvasAndContextWebGL2 = exports.getCanvasAndContext2D = exports.withCanvasAndContextSaved = exports.withCanvasAndContext = void 0;
/**
 * A helper function to get the canvas and Canvas 2D context of a React RefObject
 * Accepts a canvas reference and a callback which only runs if the canvas and context2D from the reference are non-null
 * Meant mostly to cut down on boilerplate of checking for a canvas and then a context, which can take around 5 or 6 lines of code to do absolutely nothing
 * Optionally, there is a function that can be passed in as a third argument if code needs to be run in case the canvas or context could not be found
 *
 * This is meant to replace getCanvasAndContext2D, as it throws errors which have to be handled, while in most cases when these "errors" are throne nothing is supposed to happen anyway
 * @param callbackfn A callback that takes in a canvas and context2D as parameters, and only runs if the canvas and context are non-null
 * @returns void
 */
function withCanvasAndContext(canvasRef, callbackfn, onerror) {
    const canvas = canvasRef.current;
    if (canvas !== null && canvas !== undefined) {
        const context = canvas.getContext("2d");
        if (context !== null && context !== undefined) {
            callbackfn(canvas, context);
            return;
        }
    }
    onerror?.();
}
exports.withCanvasAndContext = withCanvasAndContext;
/**
 * A helper function to get the canvas and Canvas 2D context of a React RefObject, as well as handle saving and restoring the 2D context automatically
 * Accepts a canvas reference and a callback which only runs if the canvas and context2D from the reference are non-null
 * Meant mostly to cut down on boilerplate of checking for a canvas and then a context, which can take around 5 or 6 lines of code to do absolutely nothing, as well as saving and restoring context
 * Optionally, there is a function that can be passed in as a third argument if code needs to be run in case the canvas or context could not be found
 *
 * This is meant to extend withCanvasAndContext
 * @param callbackfn A callback that takes in a canvas and context2D as parameters, and only runs if the canvas and context are non-null
 * @returns void
 */
function withCanvasAndContextSaved(canvasRef, callbackfn, onerror) {
    const canvas = canvasRef.current;
    if (canvas !== null && canvas !== undefined) {
        const context = canvas.getContext("2d");
        if (context !== null && context !== undefined) {
            context.save();
            callbackfn(canvas, context);
            context.restore();
            return;
        }
    }
    onerror?.();
}
exports.withCanvasAndContextSaved = withCanvasAndContextSaved;
/**
 * A helper function to get the canvas and Canvas 2D context of a React RefObject
 * @param ref A React Ref Object to an HTML Canvas Element
 * @returns The HTML Canvas and the Canvas Rendering Context taken from the ref object
 * @throws Error when either the context cannot be gotten ("HTMLCanvasElement.getContext('2d') returns null or undefined"), or the value inside the ref to the canvas is null or undefined
 */
function getCanvasAndContext2D(canvasRef) {
    const canvas = canvasRef.current;
    if (canvas !== null && canvas !== undefined) {
        const context = canvas.getContext("2d");
        if (context !== null && context !== undefined) {
            return [canvas, context];
        }
        throw new Error(`Could not get Canvas context, context declared ${context}`);
    }
    throw new Error(`Could not get Canvas Context: Canvas found to be ${canvas}`);
}
exports.getCanvasAndContext2D = getCanvasAndContext2D;
/**
 * A helper function to get the canvas and WebGL2 context of a React RefObject
 * Accepts a canvas reference and a callback which only runs if the canvas and webgl2 context from the reference are non-null
 * Meant mostly to cut down on boilerplate of checking for a canvas and then a context, which can take around 5 or 6 lines of code to do absolutely nothing
 * Optionally, there is a function that can be passed in as a third argument if code needs to be run in case the canvas or context could not be found
 *
 * This is meant to replace getCanvasAndContext2D, as it throws errors which have to be handled, while in most cases when these "errors" are throne nothing is supposed to happen anyway
 * @param callbackfn A callback that takes in a canvas and context2D as parameters, and only runs if the canvas and context are non-null
 * @returns
 */
function withCanvasAndContextWebGL2(canvasRef, callbackfn, onerror) {
    const canvas = canvasRef.current;
    if (canvas !== null && canvas !== undefined) {
        const gl = canvas.getContext("webgl2");
        if (gl !== null && gl !== undefined) {
            callbackfn({ canvas: canvas, gl: gl });
            return;
        }
    }
    onerror?.();
}
exports.withCanvasAndContextWebGL2 = withCanvasAndContextWebGL2;
