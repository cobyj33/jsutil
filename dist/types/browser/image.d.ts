export declare function getImageFileBase64(file: File): Promise<string>;
export declare function loadImage(url: string): Promise<HTMLImageElement>;
export declare function getImageData(image: HTMLImageElement): ImageData;
export declare function getImageDataFromBase64(base64: string): Promise<ImageData>;
export declare function getImageDataFromFile(file: File): Promise<ImageData>;
export declare function scaleImage(data: HTMLImageElement, factor: number): ImageData | null;
export declare function getScalingFactor(source: {
    width: number;
    height: number;
}, dest: {
    width: number;
    height: number;
}): number;
export declare function imageToCanvas(image: HTMLImageElement): HTMLCanvasElement;
declare const _default: {
    getImageFileBase64: typeof getImageFileBase64;
    loadImage: typeof loadImage;
    getImageData: typeof getImageData;
    getImageDataFromBase64: typeof getImageDataFromBase64;
    getImageDataFromFile: typeof getImageDataFromFile;
};
export default _default;
//# sourceMappingURL=image.d.ts.map