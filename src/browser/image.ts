import { getBlobBase64 } from "./util" 
import { IDimension2D } from "../common/Dimension2D";

/**
 * @brief loads and HTMLImageElement from a given URL
 * 
 * @param url The URL to load an HTMLImageElement from
 * @returns A Promise which either resolves to the loaded HTMLImageElement or rejects as the faulty url provided to the function
 */
export async function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        }
        image.onerror = () => {
            reject(url)
        }
        image.src = url;
    })
}

/**
 * @brief returns an ImageData object representing the pixels from a given HTMLImageElement
 * 
 * @param image An HTMLImageElement to extract pixel data from
 * @returns An ImageData object representing the pixels from a given HTMLImageElement
 * @throws If the internal canvas used to convert the HTMLImageElement into an ImageData object cannot create a 2D rendering context
 */
export function getImageData(image: HTMLImageElement): ImageData {
    const canvas = document.createElement("canvas")
    canvas.width = image.width
    canvas.height = image.height
    canvas.style.imageRendering = "crisp-edges"
    const context = canvas.getContext("2d")
    if (context !== null && context !== undefined) {
        context.drawImage(image, 0, 0)
        const data = context.getImageData(0, 0, canvas.width, canvas.height)
        console.log(data)
        return data
    }
    throw new Error("Could not initalize canvas context to get image data")
}

/**
 * @brief asyncronously returns an ImageData object representing the pixels from a given base64 encoded image
 * 
 * @param image A base64 image to extract pixel data from
 * @returns An ImageData object representing the pixels from a given base64 encoded image
 * @throws If the internal canvas used to convert the given base64 encoded image into an ImageData object cannot create a 2D rendering context
 * @throws If an HTMLImageElement could not be loaded from the base64 encoded string
 */
export async function getImageDataFromBase64(base64: string): Promise<ImageData> {
    const image = await loadImage(base64)
    return getImageData(image)
}

/**
 * @brief asyncronously returns an ImageData object representing the pixels from a given File object
 * 
 * @param image A File object which represents an image file to extract pixel data from
 * @returns An ImageData object representing the pixels from a given File object
 * @throws If the given image File could not be converted into a base64 encoded string
 * @throws If an HTMLImageElement could not be loaded from the base64 encoded string created from the File Object
 * @throws If the internal canvas used to convert the given File object into an ImageData object cannot create a 2D rendering context
 */
export async function getImageDataFromFile(file: File): Promise<ImageData> {
    const base64 = await getBlobBase64(file)
    return getImageDataFromBase64(base64)
}

/**
 * @brief Scale an HTMLImageElement by a factor into a ImageData object
 * 
 * @param image The HTMLImageElement to scale
 * @param factor The factor to scale the image's sides by
 * @returns An ImageData object representing the pixels of the newly created image
 */
export function scaleImageToImageData(image: HTMLImageElement, factor: number): ImageData {
    const canvas = document.createElement("canvas")
    canvas.width = image.width * factor
    canvas.height = image.height * factor
    canvas.style.imageRendering = "crisp-edges"
    const context = canvas.getContext("2d")
    if (context !== null && context !== undefined) {
        context.scale(factor, factor)
        context.drawImage(image, 0, 0)
        const result = context.getImageData(0, 0, image.width * factor, image.height * factor)
        return result
    }
    throw new Error("Could not initalize canvas context to scale HTML Image")
}

/**
 * @brief Return the scaling factor required to fit a set of dimensions into a given bounding box
 * 
 * @param source An IDimension2D object representing the source dimensions 
 * @param dest An IDimension2D object representing the destination dimensions to scale toward
 * @returns The factor required to scale the source dimensions to fit into the destination dimensions while preserving the source's aspect ratio
 */
export function getScalingFactor(source: IDimension2D, dest: IDimension2D) {
    return Math.min( dest.width / source.width, dest.height / source.height )
}

/**
 * @brief Get an HTMLCanvasElement with a given HTMLImageElement drawn on top of it
 * 
 * @note This function returns a canvas to be used with the CanvasRenderingContext2D API. Therefore, "webgl", "webgl2", or any other non-"2d" context that can be returned from canvas.getContext(value) will return null
 * 
 * @param image The HTMLImageElement to impose onto a canvas
 * @returns An HTMLCanvasElement which has the provided HTMLImageElement drawn onto it
 */
export function imageToCanvas(image: HTMLImageElement): HTMLCanvasElement {
    const canvas = document.createElement("canvas")
    canvas.width = image.width
    canvas.height = image.height
    canvas.style.imageRendering = "crisp-edges"
    const context = canvas.getContext("2d")
    if (context !== null && context !== undefined) {
        context.drawImage(image, 0, 0)
    } else {
        throw new Error("[jsutil::imageToCanvas] Could not create 2D rendering context for canvas")
    }
    return canvas
}

/**
 * @brief retrieve the 8-bit RGBA values from a given ImageData object as a 4-length tuple
 * @param data The ImageData object to retrieve the pixel data from
 * @param row The row to retrieve the pixel data from
 * @param col The column to retrieve the pixel data from
 * @returns The RGBA values of the pixel located at the provided row and column of the provided ImageData
 */
export function getPixel(data: ImageData, row: number, col: number): [number, number, number, number] {
    return [0, 1, 2, 3].map(num => data.data[row * data.width * 4 + col * 4 + num]) as [number, number, number, number]
}

/**
 * @brief retrieve all 8-bit RGBA values from a given ImageData object as a 2D matrix of 4-length tuples
 * @param data The ImageData object to retrieve the pixel data from
 * @returns The RGBA values of all pixels of the provided ImageData as a 2D matrix of 4-length tuples
 */
export function getPixels(data: ImageData): [number, number, number, number][][] {
    return Array.from({length: data.height}, (_, row) => Array.from({length: data.width}, (_, col) => getPixel(data, col, row)))
}

// function equalPixels(first: [number, number, number, number], second: [number, number, number, number]) {
//     return first[0] === second[0] && first[1] === second[1] && first[2] === second[2] && first[3] === second[3]
// }

export default { loadImage, getImageData, getImageDataFromBase64, getImageDataFromFile }