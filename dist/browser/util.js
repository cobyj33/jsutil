"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImageFile = exports.isEqualDOMRect = exports.requestWebDownload = void 0;
/**
 * Make the user download a file onto their computer
 *
 * NOTE: ONLY WORKS INSIDE THE CONTEXT OF THE BROWSER, SHOULD NOT BE USED SERVER-SIDE
 * NOTE: Since we are using vite as of now, this shouldn't matter, but in case of a switch to a different framework it will become necessary
 * NOTE: Implemented as a closure containing an anchor which is used to download files through simulated clicks
 * Probably would need to be modified to work in a non-static site generator, but it does fit into the context of this program
 */
function requestWebDownload(data, fileName) {
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("data-purpose", "downloading");
    document.body.appendChild(downloadAnchor);
    const url = URL.createObjectURL(data);
    downloadAnchor.href = url;
    downloadAnchor.download = fileName;
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}
exports.requestWebDownload = requestWebDownload;
function isEqualDOMRect(first, second) {
    return first.x === second.x && first.y === second.y && first.width === second.width && first.height === second.height;
}
exports.isEqualDOMRect = isEqualDOMRect;
function isImageFile(file) {
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return validImageTypes.some(imageType => imageType === file.type);
}
exports.isImageFile = isImageFile;
