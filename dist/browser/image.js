"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageToCanvas = exports.getScalingFactor = exports.scaleImage = exports.getImageDataFromFile = exports.getImageDataFromBase64 = exports.getImageData = exports.loadImage = exports.getImageFileBase64 = void 0;
const util_1 = require("../util");
// type Pixel = [number, number, number, number]
async function getImageFileBase64(file) {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => {
            if (e.target !== null && e.target !== undefined) {
                if (e.target.result !== null && e.target.result !== undefined) {
                    if (typeof (e.target.result) === "string") {
                        res(e.target.result);
                    }
                    rej(`[getImageFileBase64] Could not load base64 of image file ${file.name}: No result of reading file is not a string`);
                }
                rej(`[getImageFileBase64] Could not load base64 of image file ${file.name}: No result found from reading file`);
            }
            rej(`[getImageFileBase64] Could not load base64 of image file ${file.name}: No target found from reading file`);
        };
        reader.onerror = e => {
            rej(`[getImageFileBase64] Error occured while loading image file: ${(0, util_1.getErrorMessage)(e)} `);
        };
        reader.readAsDataURL(file);
    });
}
exports.getImageFileBase64 = getImageFileBase64;
async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            reject(url);
        };
        image.src = url;
    });
}
exports.loadImage = loadImage;
function getImageData(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.style.imageRendering = "crisp-edges";
    const context = canvas.getContext("2d");
    if (context !== null && context !== undefined) {
        context.drawImage(image, 0, 0);
        const data = context.getImageData(0, 0, canvas.width, canvas.height);
        console.log(data);
        return data;
    }
    throw new Error("Could not initalize canvas context to get image data");
}
exports.getImageData = getImageData;
async function getImageDataFromBase64(base64) {
    const image = await loadImage(base64);
    return getImageData(image);
}
exports.getImageDataFromBase64 = getImageDataFromBase64;
async function getImageDataFromFile(file) {
    const base64 = await getImageFileBase64(file);
    return getImageDataFromBase64(base64);
}
exports.getImageDataFromFile = getImageDataFromFile;
function scaleImage(data, factor) {
    const canvas = document.createElement("canvas");
    canvas.width = data.width * factor;
    canvas.height = data.height * factor;
    canvas.style.imageRendering = "crisp-edges";
    const context = canvas.getContext("2d");
    if (context !== null && context !== undefined) {
        context.scale(factor, factor);
        context.drawImage(data, 0, 0);
        const result = context.getImageData(0, 0, data.width * factor, data.height * factor);
        return result;
    }
    return null;
}
exports.scaleImage = scaleImage;
function getScalingFactor(source, dest) {
    return Math.min(dest.width / source.width, dest.height / source.height);
}
exports.getScalingFactor = getScalingFactor;
function imageToCanvas(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.style.imageRendering = "crisp-edges";
    const context = canvas.getContext("2d");
    if (context !== null && context !== undefined) {
        context.drawImage(image, 0, 0);
    }
    else {
        console.error("ERROR WHILE GETTING CANVAS IMAGE FOR SPRITESHEET: 2D CONTEXT NOT LOADED ");
    }
    return canvas;
}
exports.imageToCanvas = imageToCanvas;
// function getPixelVec2(data: ImageData, position: IVector2): [number, number, number, number] {
//     return getPixel(data, position.col, position.row)
// }
function getPixel(data, x, y) {
    return [0, 1, 2, 3].map(num => data.data[y * data.width * 4 + x * 4 + num]);
}
// function getPixels(data: ImageData): [number, number, number, number][][] {
//     return Array.from({length: data.height}, (_, row) => Array.from({length: data.width}, (_, col) => getPixel(data, col, row)))
// }
// function equalPixels(first: [number, number, number, number], second: [number, number, number, number]) {
//     return first[0] === second[0] && first[1] === second[1] && first[2] === second[2] && first[3] === second[3]
// }
exports.default = { getImageFileBase64, loadImage, getImageData, getImageDataFromBase64, getImageDataFromFile };
