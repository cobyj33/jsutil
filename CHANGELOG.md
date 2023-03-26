
# jsutil ChangeLog

## March 26, 2023

### Public API

Renamed getImageFileBase64 to getBlobBase64, as the function is not specific to only image files, and is not
specific to files in general, although it can work with file objects

Renamed isImageFile to isImageBlob, as the function can work with both File and Blob objects, and the function
is not specific to File objects

Renamed requestWebDownload function to clientRequestWebDownload, as it only works in Web Browsers and the "client" prefix better reflects
this limitation

createVertexBuffer only accepts a Float32 Array now instead of a number[]

createElementArrayBuffer only accepts a Uint16Array now instead of a number[]

changed ALL WebGL functions to contain WebGL in the name

fixed problem in compileWebGLProgram where the fragment shader parameter was set to a type of WebGLProgram

Removed FreqMap2D full_clear function. I thought it looked ugly. Replaced with FreqMap2D.clear(true) to fully clear all cached internal data structures in the FreqMap2D

Removed Set2D fullClear function. I thought it looked ugly. Replaced with Set2D.clear(true) to fully clear all cached internal data structures in the Set2D

Removed Set2D.fromNumberMatrix, as it is really specific to the automata project and it really has nothing to do with a Set2D data structure

Set2D.push can now take in a number pair array ```ts [number, number][]```
Set2D.combine can now take in a number pair array ```ts [number, number][]```

### Dev Notes

Renamed src/common/Dimension.ts to src/common/Dimension2D.ts to better reflect src/common/Dimension2D.ts's
internal Dimension2D class and IDimension2D interface

Moved getBlobBase64 to src/browser/util from src/browser/image, as the function is not specific to only image files

Fixed incorrect documentation of isRectangularMatrix and getRectangularMatrixDimensions in src/common/util, which stated that
a rectangular matrix is required to have a non-zero length. A rectangular matrix can have a non-zero length, as a rectangle can have
a width or height of 0, and the caller is responsible for asserting that their own matrix-length is non-zero if that is desired.
