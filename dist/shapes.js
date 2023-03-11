"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShapeFunction = exports.SHAPE_TO_SHAPE_FUNCTION = exports.getSquare = exports.getBox = exports.getCircle = exports.getEllipse = exports.getLine = exports.Supported2DShapes = void 0;
const Box_1 = require("./Box");
const Vector2_1 = require("./Vector2");
exports.Supported2DShapes = ["LINE", "ELLIPSE", "CIRCLE", "BOX", "SQUARE"];
const getLine = (start, end) => {
    if (start.row === end.row && start.col === end.col) {
        return [Object.assign({}, start)];
    }
    const { row: row1, col: col1 } = start;
    const { row: row2, col: col2 } = end;
    const intersections = [];
    if (col1 === col2) {
        for (let row = Math.min(row1, row2); row <= Math.max(row1, row2); row++) {
            intersections.push({ row: Math.trunc(row), col: Math.trunc(col1) });
        }
    }
    else if (row1 === row2) {
        for (let col = Math.min(col1, col2); col <= Math.max(col1, col2); col++) {
            intersections.push({ row: Math.trunc(row1), col: Math.trunc(col) });
        }
    }
    else {
        const slope = (row1 - row2) / (col1 - col2);
        const yIntercept = row1 - (slope * col1);
        for (let col = Math.min(col1, col2); col <= Math.max(col1, col2); col++) {
            const row = (slope * col) + yIntercept;
            intersections.push({ row: Math.trunc(row), col: Math.trunc(col) });
        }
        for (let row = Math.min(row1, row2); row <= Math.max(row1, row2); row++) {
            const col = (row - yIntercept) / slope;
            intersections.push({ row: Math.trunc(row), col: Math.trunc(col) });
        }
    }
    return (0, Vector2_1.filterVector2ListDuplicates)(intersections);
};
exports.getLine = getLine;
const getEllipse = (start, end) => {
    if (start.row === end.row && start.col === end.col) {
        return [Object.assign({}, start)];
    }
    const { row: row1, col: col1 } = start;
    const { row: row2, col: col2 } = end;
    const centerCol = (col1 + col2) / 2;
    const centerRow = (row1 + row2) / 2;
    const horizontalRadius = Math.abs(col1 - col2) / 2;
    const verticalRadius = Math.abs(row1 - row2) / 2;
    const intersections = [];
    if (col1 == col2 || row1 == row2) {
        return (0, exports.getLine)(start, end);
    }
    for (let col = Math.min(start.col, end.col); col <= Math.max(start.col, end.col); col += 1) {
        const evaluation = Math.sqrt(Math.pow(verticalRadius, 2) * (1 - (Math.pow(col - centerCol, 2) / Math.pow(horizontalRadius, 2))));
        intersections.push({ row: Math.floor(centerRow + evaluation), col: Math.floor(col) });
        intersections.push({ row: Math.floor(centerRow - evaluation), col: Math.floor(col) });
    }
    for (let row = Math.min(start.row, end.row); row <= Math.max(start.row, end.row); row += 1) {
        const evaluation = Math.sqrt(Math.pow(horizontalRadius, 2) * (1 - (Math.pow(row - centerRow, 2) / Math.pow(verticalRadius, 2))));
        intersections.push({ row: Math.floor(row), col: Math.floor(centerCol + evaluation) });
        intersections.push({ row: Math.floor(row), col: Math.floor(centerCol - evaluation) });
    }
    return (0, Vector2_1.filterVector2ListDuplicates)(intersections);
};
exports.getEllipse = getEllipse;
const getCircle = (start, end) => {
    const sideLength = Vector2_1.Vector2.fromData(start).subtract(end).abs().min();
    return (0, exports.getEllipse)(start, (0, Vector2_1.translateVector2)(start, sideLength, sideLength));
};
exports.getCircle = getCircle;
const getBox = (start, end) => {
    return Box_1.Box.enclosed([start, end]).cells();
};
exports.getBox = getBox;
const getSquare = (start, end) => {
    const sideLength = Vector2_1.Vector2.fromData(start).subtract(end).abs().min();
    return (0, exports.getBox)(start, (0, Vector2_1.translateVector2)(start, sideLength, sideLength));
};
exports.getSquare = getSquare;
exports.SHAPE_TO_SHAPE_FUNCTION = {
    "LINE": exports.getLine,
    "BOX": exports.getBox,
    "CIRCLE": exports.getCircle,
    "ELLIPSE": exports.getEllipse,
    "SQUARE": exports.getSquare
};
function getShapeFunction(shape) {
    return exports.SHAPE_TO_SHAPE_FUNCTION[shape];
}
exports.getShapeFunction = getShapeFunction;
