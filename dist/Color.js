"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = exports.areEqualColors = exports.rgbaToCSSString = exports.rgbToCSSString = exports.isRGBAObject = exports.isRGBObject = exports.getColorDataFromCSS = exports.parseHexColorString = exports.expandShorthandHexColorString = exports.isHexColorStringWithAlpha = exports.isValidShorthandHexColorString = exports.isValidHexColorString = exports.getHexFromCSSColorName = exports.isCSSHexColorValue = exports.isCSSColorName = exports.CSS_COLOR_NAMES_TO_HEX = exports.Color = void 0;
const hex_1 = require("./hex");
const util_1 = require("./util");
/**
 * Stores color data as an RGBA with each value in the range 0 - 255
 */
class Color {
    red;
    green;
    blue;
    alpha;
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    static fromRGBA(rgba) {
        return new Color(rgba.red, rgba.green, rgba.blue, rgba.alpha);
    }
    static fromRGBANormalized(rgba) {
        return new Color(rgba.red * 255, rgba.green * 255, rgba.blue * 255, rgba.alpha * 255);
    }
    static fromCSS(name) {
        if (isCSSColorName(name)) {
            const color = getColorDataFromCSS(name);
            return new Color(color.red, color.green, color.blue, "alpha" in color ? color.alpha : 255);
        }
        throw new Error(`Could not create Color object from unrecognized CSS Color Name: ${name}`);
    }
    static random() {
        return Color.fromRGBA(getRandomColor());
    }
    darken(percent) {
        return new Color((1 - percent) * this.red, (1 - percent) * this.green, (1 - percent) * this.blue, this.alpha);
    }
    lighten(percent) {
        return new Color(this.red + percent * (255 - this.red), this.green + percent * (255 - this.green), this.blue + percent * (255 - this.blue), this.alpha);
    }
    normalized() {
        return new Color(this.red / 255, this.blue / 255, this.green / 255, this.alpha / 255);
    }
    rgb() {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue
        };
    }
    rgba() {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        };
    }
    tuple() {
        return [this.red, this.green, this.blue, this.alpha];
    }
}
exports.Color = Color;
exports.CSS_COLOR_NAMES_TO_HEX = Object.freeze({
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff",
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a",
    "burlywood": "#deb887",
    "cadetblue": "#5f9ea0",
    "chartreuse": "#7fff00",
    "chocolate": "#d2691e",
    "coral": "#ff7f50",
    "cornflowerblue": "#6495ed",
    "cornsilk": "#fff8dc",
    "crimson": "#dc143c",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkgrey": "#a9a9a9",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkslategrey": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "fuchsia": "#ff00ff",
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "goldenrod": "#daa520",
    "gold": "#ffd700",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#adff2f",
    "grey": "#808080",
    "honeydew": "#f0fff0",
    "hotpink": "#ff69b4",
    "indianred": "#cd5c5c",
    "indigo": "#4b0082",
    "ivory": "#fffff0",
    "khaki": "#f0e68c",
    "lavenderblush": "#fff0f5",
    "lavender": "#e6e6fa",
    "lawngreen": "#7cfc00",
    "lemonchiffon": "#fffacd",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgray": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightgrey": "#d3d3d3",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "lime": "#00ff00",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "magenta": "#ff00ff",
    "maroon": "#800000",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370db",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "navy": "#000080",
    "oldlace": "#fdf5e6",
    "olive": "#808000",
    "olivedrab": "#6b8e23",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#db7093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "pink": "#ffc0cb",
    "plum": "#dda0dd",
    "powderblue": "#b0e0e6",
    "purple": "#800080",
    "rebeccapurple": "#663399",
    "red": "#ff0000",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "salmon": "#fa8072",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "sienna": "#a0522d",
    "silver": "#c0c0c0",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "slategrey": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tan": "#d2b48c",
    "teal": "#008080",
    "thistle": "#d8bfd8",
    "tomato": "#ff6347",
    "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3",
    "white": "#ffffff",
    "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00",
    "yellowgreen": "#9acd32"
});
const CSS_HEX_VALUES_TO_CSS_NAME = (0, util_1.flipObject)(exports.CSS_COLOR_NAMES_TO_HEX);
function isCSSColorName(str) {
    return str in exports.CSS_COLOR_NAMES_TO_HEX;
}
exports.isCSSColorName = isCSSColorName;
function isCSSHexColorValue(str) {
    return str in CSS_HEX_VALUES_TO_CSS_NAME;
}
exports.isCSSHexColorValue = isCSSHexColorValue;
function getHexFromCSSColorName(color) {
    return exports.CSS_COLOR_NAMES_TO_HEX[color];
}
exports.getHexFromCSSColorName = getHexFromCSSColorName;
const SHORTHAND_HEXIDECIMAL_COLOR_STRING_LENGTH = 4; // includes "#" at start
const SHORTHAND_WITH_ALPHA_HEXIDECIMAL_COLOR_STRING_LENGTH = 5; // includes "#" at start
const HEXIDECIMAL_COLOR_STRING_LENGTH = 7; // includes "#" at start
const HEXIDECIMAL_WITH_ALPHA_COLOR_STRING_LENGTH = 9; // includes "#" at start
const VALID_HEX_DIGIT_STRING_LENGTHS = [SHORTHAND_HEXIDECIMAL_COLOR_STRING_LENGTH, SHORTHAND_WITH_ALPHA_HEXIDECIMAL_COLOR_STRING_LENGTH, HEXIDECIMAL_COLOR_STRING_LENGTH, HEXIDECIMAL_WITH_ALPHA_COLOR_STRING_LENGTH];
const VALID_SHORTHAND_HEX_DIGIT_STRING_LENGTHS = [SHORTHAND_HEXIDECIMAL_COLOR_STRING_LENGTH, SHORTHAND_WITH_ALPHA_HEXIDECIMAL_COLOR_STRING_LENGTH];
const VALID_ALPHA_HEX_DIGIT_STRING_LENGTHS = [SHORTHAND_WITH_ALPHA_HEXIDECIMAL_COLOR_STRING_LENGTH, HEXIDECIMAL_WITH_ALPHA_COLOR_STRING_LENGTH];
/**
 * @brief Validate Hex Color string in the format "#FFF", "#FFFF", "#FFFFFF", or "#FFFFFFFF", where each "F" can be any hexadecimal digit between 0 and F
 *
 *  Examples:
 *      - "#A3F" (Shorthand)
 *      - "#98C4" (Shorthand with Alpha)
 *      - "#F3FAFF" (Full)
 *      - "#BD24A017" (Full with Alpha)
 *
 *  @param str: The hex string to validate
 *  @returns A boolean determining whether the string fits the determined hex schema
**/
function isValidHexColorString(str) {
    if (str.startsWith("#")) {
        if (VALID_HEX_DIGIT_STRING_LENGTHS.some(len => str.length === len)) {
            return (0, hex_1.isRawHexNumberString)(str.slice(1));
        }
    }
    return false;
}
exports.isValidHexColorString = isValidHexColorString;
/**
 * @brief Validate Hex Color string in the format "#FFF", or "#FFFF", where each "F" can be any hexadecimal digit between 0 and F
 *
 *  Examples:
 *      - "#A3F" (Shorthand)
 *      - "#98C4" (Shorthand with Alpha)
 *
 *  @param str: The shorthand hex string to validate
 *  @returns A boolean determining whether the string fits the determined shorthand hex schema
**/
function isValidShorthandHexColorString(str) {
    if (str.startsWith("#")) {
        if (VALID_SHORTHAND_HEX_DIGIT_STRING_LENGTHS.some(len => str.length === len)) {
            return (0, hex_1.isRawHexNumberString)(str.slice(1));
        }
    }
    return false;
}
exports.isValidShorthandHexColorString = isValidShorthandHexColorString;
function isHexColorStringWithAlpha(str) {
    return isValidHexColorString(str) && VALID_ALPHA_HEX_DIGIT_STRING_LENGTHS.some(len => len === str.length);
}
exports.isHexColorStringWithAlpha = isHexColorStringWithAlpha;
/**
 *
 * Expand a Shorthand Hex Color
 * Example:
 *     #FA2 -> #FFAA22
 * :param strdata: the hex string to expand
 * :type strdata: str
 * @param str
 * @returns An expanded hex string
 **/
function expandShorthandHexColorString(str) {
    return "#" + str.split("").flatMap(digit => `${digit}${digit}`).join("");
}
exports.expandShorthandHexColorString = expandShorthandHexColorString;
/**
 * Parse Hex Color string in the formats "#FFF", "#FFFF", "#FFFFFF", or "#FFFFFFFF"
 *     Value Parameter Descriptions:
 *         - **F**: any hexadecimal digit between 0 and F inclusive
 *     Examples:
 *         - "#A3F" (Shorthand)
 *         - "#98C4" (Shorthand with Alpha)
 *         - "#F3FAFF" (Full)
 *         - "#BD24A017" (Full with Alpha)
 * :param strdata: the hex string to parse
 * :type strdata: str
 * :returns: A pygame Color from the hex data parsed from strdata
 *
 * @returns RGBA or RGB object containing color data
 */
function parseHexColorString(str) {
    if (isValidHexColorString(str)) {
        const expandedHexString = isValidShorthandHexColorString(str) ? expandShorthandHexColorString(str) : str;
        if (isHexColorStringWithAlpha(expandedHexString)) {
            return {
                red: (0, hex_1.parseRawHexNumberString)(expandedHexString.slice(1, 3)),
                green: (0, hex_1.parseRawHexNumberString)(expandedHexString.slice(3, 5)),
                blue: (0, hex_1.parseRawHexNumberString)(expandedHexString.slice(5, 7)),
                alpha: (0, hex_1.parseRawHexNumberString)(expandedHexString.slice(7, 9))
            };
        }
        return {
            red: (0, hex_1.parseRawHexNumberString)(expandedHexString.slice(1, 3)),
            green: (0, hex_1.parseRawHexNumberString)(expandedHexString.slice(3, 5)),
            blue: (0, hex_1.parseRawHexNumberString)(expandedHexString.slice(5, 7))
        };
    }
    else {
        throw new Error(`Could not parse invalid hex color string ${str}`);
    }
}
exports.parseHexColorString = parseHexColorString;
function getColorDataFromCSS(str) {
    const hexStr = getHexFromCSSColorName(str);
    return parseHexColorString(hexStr);
}
exports.getColorDataFromCSS = getColorDataFromCSS;
function isRGBObject(obj) {
    return typeof (obj) === "object" && obj !== null &&
        "red" in obj && "green" in obj && "blue" in obj &&
        typeof (obj["red"]) === "number" && typeof (obj["blue"]) === "number" && typeof (obj["green"]) === "number";
}
exports.isRGBObject = isRGBObject;
function isRGBAObject(obj) {
    return isRGBObject(obj) && "alpha" in obj && typeof (obj["alpha"]) == "number";
}
exports.isRGBAObject = isRGBAObject;
function rgbToCSSString(color) {
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}
exports.rgbToCSSString = rgbToCSSString;
function rgbaToCSSString(color) {
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
}
exports.rgbaToCSSString = rgbaToCSSString;
function areEqualColors(first, second) {
    if ("alpha" in first && "alpha" in second) {
        return first.red === second.red && first.green === second.green && first.blue === second.blue && first.alpha === second.alpha;
    }
    else if ("alpha" in first && !("alpha" in second)) {
        return first.red === second.red && first.green === second.green && first.blue === second.blue && first.alpha === 255;
    }
    else if (!("alpha" in first) && "alpha" in second) {
        return first.red === second.red && first.green === second.green && first.blue === second.blue && second.alpha === 255;
    }
    return first.red === second.red && first.green === second.green && first.blue === second.blue;
}
exports.areEqualColors = areEqualColors;
function getRandomColor() {
    return { red: Math.trunc(Math.random() * 255), blue: Math.trunc(Math.random() * 255), green: Math.trunc(Math.random() * 255), alpha: 255 };
}
exports.getRandomColor = getRandomColor;
