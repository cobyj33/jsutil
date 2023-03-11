export interface RGB {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
}
export interface RGBA extends RGB {
    readonly alpha: number;
}
/**
 * Stores color data as an RGBA with each value in the range 0 - 255
 */
export declare class Color implements RGBA {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;
    constructor(red: number, green: number, blue: number, alpha: number);
    static fromRGBA(rgba: RGBA): Color;
    static fromRGBANormalized(rgba: RGBA): Color;
    static fromCSS(name: string): Color;
    static random(): Color;
    darken(percent: number): Color;
    lighten(percent: number): Color;
    normalized(): Color;
    rgb(): RGB;
    rgba(): RGBA;
    tuple(): [number, number, number, number];
}
export declare const CSS_COLOR_NAMES_TO_HEX: Readonly<{
    readonly aliceblue: "#f0f8ff";
    readonly antiquewhite: "#faebd7";
    readonly aqua: "#00ffff";
    readonly aquamarine: "#7fffd4";
    readonly azure: "#f0ffff";
    readonly beige: "#f5f5dc";
    readonly bisque: "#ffe4c4";
    readonly black: "#000000";
    readonly blanchedalmond: "#ffebcd";
    readonly blue: "#0000ff";
    readonly blueviolet: "#8a2be2";
    readonly brown: "#a52a2a";
    readonly burlywood: "#deb887";
    readonly cadetblue: "#5f9ea0";
    readonly chartreuse: "#7fff00";
    readonly chocolate: "#d2691e";
    readonly coral: "#ff7f50";
    readonly cornflowerblue: "#6495ed";
    readonly cornsilk: "#fff8dc";
    readonly crimson: "#dc143c";
    readonly cyan: "#00ffff";
    readonly darkblue: "#00008b";
    readonly darkcyan: "#008b8b";
    readonly darkgoldenrod: "#b8860b";
    readonly darkgray: "#a9a9a9";
    readonly darkgreen: "#006400";
    readonly darkgrey: "#a9a9a9";
    readonly darkkhaki: "#bdb76b";
    readonly darkmagenta: "#8b008b";
    readonly darkolivegreen: "#556b2f";
    readonly darkorange: "#ff8c00";
    readonly darkorchid: "#9932cc";
    readonly darkred: "#8b0000";
    readonly darksalmon: "#e9967a";
    readonly darkseagreen: "#8fbc8f";
    readonly darkslateblue: "#483d8b";
    readonly darkslategray: "#2f4f4f";
    readonly darkslategrey: "#2f4f4f";
    readonly darkturquoise: "#00ced1";
    readonly darkviolet: "#9400d3";
    readonly deeppink: "#ff1493";
    readonly deepskyblue: "#00bfff";
    readonly dimgray: "#696969";
    readonly dimgrey: "#696969";
    readonly dodgerblue: "#1e90ff";
    readonly firebrick: "#b22222";
    readonly floralwhite: "#fffaf0";
    readonly forestgreen: "#228b22";
    readonly fuchsia: "#ff00ff";
    readonly gainsboro: "#dcdcdc";
    readonly ghostwhite: "#f8f8ff";
    readonly goldenrod: "#daa520";
    readonly gold: "#ffd700";
    readonly gray: "#808080";
    readonly green: "#008000";
    readonly greenyellow: "#adff2f";
    readonly grey: "#808080";
    readonly honeydew: "#f0fff0";
    readonly hotpink: "#ff69b4";
    readonly indianred: "#cd5c5c";
    readonly indigo: "#4b0082";
    readonly ivory: "#fffff0";
    readonly khaki: "#f0e68c";
    readonly lavenderblush: "#fff0f5";
    readonly lavender: "#e6e6fa";
    readonly lawngreen: "#7cfc00";
    readonly lemonchiffon: "#fffacd";
    readonly lightblue: "#add8e6";
    readonly lightcoral: "#f08080";
    readonly lightcyan: "#e0ffff";
    readonly lightgoldenrodyellow: "#fafad2";
    readonly lightgray: "#d3d3d3";
    readonly lightgreen: "#90ee90";
    readonly lightgrey: "#d3d3d3";
    readonly lightpink: "#ffb6c1";
    readonly lightsalmon: "#ffa07a";
    readonly lightseagreen: "#20b2aa";
    readonly lightskyblue: "#87cefa";
    readonly lightslategray: "#778899";
    readonly lightslategrey: "#778899";
    readonly lightsteelblue: "#b0c4de";
    readonly lightyellow: "#ffffe0";
    readonly lime: "#00ff00";
    readonly limegreen: "#32cd32";
    readonly linen: "#faf0e6";
    readonly magenta: "#ff00ff";
    readonly maroon: "#800000";
    readonly mediumaquamarine: "#66cdaa";
    readonly mediumblue: "#0000cd";
    readonly mediumorchid: "#ba55d3";
    readonly mediumpurple: "#9370db";
    readonly mediumseagreen: "#3cb371";
    readonly mediumslateblue: "#7b68ee";
    readonly mediumspringgreen: "#00fa9a";
    readonly mediumturquoise: "#48d1cc";
    readonly mediumvioletred: "#c71585";
    readonly midnightblue: "#191970";
    readonly mintcream: "#f5fffa";
    readonly mistyrose: "#ffe4e1";
    readonly moccasin: "#ffe4b5";
    readonly navajowhite: "#ffdead";
    readonly navy: "#000080";
    readonly oldlace: "#fdf5e6";
    readonly olive: "#808000";
    readonly olivedrab: "#6b8e23";
    readonly orange: "#ffa500";
    readonly orangered: "#ff4500";
    readonly orchid: "#da70d6";
    readonly palegoldenrod: "#eee8aa";
    readonly palegreen: "#98fb98";
    readonly paleturquoise: "#afeeee";
    readonly palevioletred: "#db7093";
    readonly papayawhip: "#ffefd5";
    readonly peachpuff: "#ffdab9";
    readonly peru: "#cd853f";
    readonly pink: "#ffc0cb";
    readonly plum: "#dda0dd";
    readonly powderblue: "#b0e0e6";
    readonly purple: "#800080";
    readonly rebeccapurple: "#663399";
    readonly red: "#ff0000";
    readonly rosybrown: "#bc8f8f";
    readonly royalblue: "#4169e1";
    readonly saddlebrown: "#8b4513";
    readonly salmon: "#fa8072";
    readonly sandybrown: "#f4a460";
    readonly seagreen: "#2e8b57";
    readonly seashell: "#fff5ee";
    readonly sienna: "#a0522d";
    readonly silver: "#c0c0c0";
    readonly skyblue: "#87ceeb";
    readonly slateblue: "#6a5acd";
    readonly slategray: "#708090";
    readonly slategrey: "#708090";
    readonly snow: "#fffafa";
    readonly springgreen: "#00ff7f";
    readonly steelblue: "#4682b4";
    readonly tan: "#d2b48c";
    readonly teal: "#008080";
    readonly thistle: "#d8bfd8";
    readonly tomato: "#ff6347";
    readonly turquoise: "#40e0d0";
    readonly violet: "#ee82ee";
    readonly wheat: "#f5deb3";
    readonly white: "#ffffff";
    readonly whitesmoke: "#f5f5f5";
    readonly yellow: "#ffff00";
    readonly yellowgreen: "#9acd32";
}>;
export type CSSColorName = keyof typeof CSS_COLOR_NAMES_TO_HEX;
export type CSSHexValue = typeof CSS_COLOR_NAMES_TO_HEX[CSSColorName];
export declare function isCSSColorName(str: string): str is CSSColorName;
export declare function isCSSHexColorValue(str: string): str is CSSColorName;
export declare function getHexFromCSSColorName(color: CSSColorName): string;
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
export declare function isValidHexColorString(str: string): boolean;
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
export declare function isValidShorthandHexColorString(str: string): boolean;
export declare function isHexColorStringWithAlpha(str: string): boolean;
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
export declare function expandShorthandHexColorString(str: string): string;
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
export declare function parseHexColorString(str: string): RGB | RGBA;
export declare function getColorDataFromCSS(str: CSSColorName): RGB | RGBA;
export declare function isRGBObject(obj: any): obj is RGB;
export declare function isRGBAObject(obj: any): obj is RGBA;
export declare function rgbToCSSString(color: RGB): string;
export declare function rgbaToCSSString(color: RGBA): string;
export declare function areEqualColors(first: RGBA | RGB, second: RGBA | RGB): boolean;
export declare function getRandomColor(): RGBA;
//# sourceMappingURL=Color.d.ts.map