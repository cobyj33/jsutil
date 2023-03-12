"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRawHexNumberString = exports.isRawHexNumberString = exports.getHexDigitNumber = exports.isHexDigitCharacter = exports.HEX_DIGIT_CHARS_SET = exports.HEX_DIGIT_CHARS = exports.HEX_DIGIT_CHARS_TO_NUMBERS = void 0;
exports.HEX_DIGIT_CHARS_TO_NUMBERS = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 10,
    "A": 10,
    "b": 11,
    "B": 11,
    "c": 12,
    "C": 12,
    "d": 13,
    "D": 13,
    "e": 14,
    "E": 14,
    "f": 15,
    "F": 15
};
exports.HEX_DIGIT_CHARS = Object.keys(exports.HEX_DIGIT_CHARS_TO_NUMBERS);
exports.HEX_DIGIT_CHARS_SET = Object.freeze(new Set(exports.HEX_DIGIT_CHARS));
function isHexDigitCharacter(char) {
    return exports.HEX_DIGIT_CHARS_SET.has(char);
}
exports.isHexDigitCharacter = isHexDigitCharacter;
function getHexDigitNumber(char) {
    return exports.HEX_DIGIT_CHARS_TO_NUMBERS[char];
}
exports.getHexDigitNumber = getHexDigitNumber;
function isRawHexNumberString(rawHex) {
    return rawHex.split("").every(char => isHexDigitCharacter(char));
}
exports.isRawHexNumberString = isRawHexNumberString;
function parseRawHexNumberString(rawHex) {
    if (isRawHexNumberString(rawHex)) {
        return Number.parseInt(rawHex, 16);
    }
    throw new Error(`Cannot parse invalid raw hex number ${rawHex}`);
}
exports.parseRawHexNumberString = parseRawHexNumberString;
