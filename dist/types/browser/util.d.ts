import { IVector2 } from "../index";
/**
 * Make the user download a file onto their computer
 *
 * NOTE: ONLY WORKS INSIDE THE CONTEXT OF THE BROWSER, SHOULD NOT BE USED SERVER-SIDE
 * NOTE: Since we are using vite as of now, this shouldn't matter, but in case of a switch to a different framework it will become necessary
 * NOTE: Implemented as a closure containing an anchor which is used to download files through simulated clicks
 * Probably would need to be modified to work in a non-static site generator, but it does fit into the context of this program
 */
export declare function requestWebDownload(data: Blob, fileName: string): void;
export declare function isEqualDOMRect(first: DOMRect, second: DOMRect): boolean;
export declare function isImageFile(file: File): boolean;
export declare function pointerPositionInElement(element: Element, event: PointerEvent): IVector2;
//# sourceMappingURL=util.d.ts.map