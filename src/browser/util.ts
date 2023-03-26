import { IVector2 } from "../common/Vector2"
import { getErrorMessage } from "../common/util";


/**
 * @brief Asyncronously return the base64 encoded representation of a given blob
 * 
 * @param blob A blob to convert to a base64 encoded string
 * @returns A base64 encoded string representation of the given blob
 * @rejects If there is an error loading the blob as a Data URL
 */
export async function getBlobBase64(blob: Blob): Promise<string> {
    return new Promise((res, rej) => {
        const reader = new FileReader()
        reader.onload = e => {
            if (e.target !== null && e.target !== undefined) {
                if (e.target.result !== null && e.target.result !== undefined) {
                    if (typeof(e.target.result) === "string") {
                        res(e.target.result)
                    }
                    rej(`[jsutil::getFileBase64] Could not load base64 of blob ${blob.name}: Non-string result of reading blob as Data URL`)
                }
                rej(`[jsutil::getFileBase64] Could not load base64 of blob ${blob.name}: No result found from reading blob as Data URL`)
            }
            rej(`[jsutil::getFileBase64] Could not load base64 of blob ${blob.name}: No target found from reading blob as Data URL`)
        }
        reader.onerror = (e) => {
            rej(`[jsutil::getFileBase64] Error occured while loading blob as Data URL: ${getErrorMessage(reader.error)} `)
        }
        reader.readAsDataURL(blob)
    })
}

/**
 * @brief Make the user download a file onto their computer
 * @note Only works on web browsers
 */
export function clientRequestWebDownload(data: Blob, fileName: string): void {
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("data-purpose", "downloading")
    document.body.appendChild(downloadAnchor);
    
    const url = URL.createObjectURL(data)
    downloadAnchor.href = url
    downloadAnchor.download = fileName;
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor)
}

export function isEqualDOMRect(first: DOMRect, second: DOMRect) {
    return first.x === second.x && first.y === second.y && first.width === second.width && first.height === second.height
}


const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
/**
 * @brief Check if a given blob is in an image format
 * 
 * @note As of now, returns if the mime type of the given Blob is "image/gif" "image/jpeg" or "image/png" 
 * 
 * @param blob The blob to check the format of
 * @returns If the mime-type of the given Blob matches with an image format
 */
export function isImageBlob(blob: Blob): boolean {
  return validImageTypes.some(imageType => imageType === blob.type)
}

/**
 * @brief Return the pointer position inside of a given element based off of a PointerEvent fired inside of that element
 * @param element The Element which fired the provided PointerEvent or MouseEvent
 * @param event The PointerEvent or MouseEvent fired from within the provided element
 * @returns The position of the fired event relative to the top left of the provided element's bounding client rect
 */
export function pointerPositionInElement(element: Element, event: PointerEvent | MouseEvent): IVector2 {
    const elementBounds: DOMRect = element.getBoundingClientRect();
    return {
        row: Math.trunc(event.clientY - elementBounds.y),
        col: Math.trunc(event.clientX - elementBounds.x)
    }
}