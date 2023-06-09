export declare const HEX_DIGIT_CHARS_TO_NUMBERS: {
    readonly "0": 0;
    readonly "1": 1;
    readonly "2": 2;
    readonly "3": 3;
    readonly "4": 4;
    readonly "5": 5;
    readonly "6": 6;
    readonly "7": 7;
    readonly "8": 8;
    readonly "9": 9;
    readonly a: 10;
    readonly A: 10;
    readonly b: 11;
    readonly B: 11;
    readonly c: 12;
    readonly C: 12;
    readonly d: 13;
    readonly D: 13;
    readonly e: 14;
    readonly E: 14;
    readonly f: 15;
    readonly F: 15;
};
export type HexDigitCharacter = keyof typeof HEX_DIGIT_CHARS_TO_NUMBERS;
export type HexNumber = typeof HEX_DIGIT_CHARS_TO_NUMBERS[HexDigitCharacter];
export declare const HEX_DIGIT_CHARS: ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "A" | "b" | "B" | "c" | "C" | "d" | "D" | "e" | "E" | "f" | "F")[];
export declare const HEX_DIGIT_CHARS_SET: Set<"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "A" | "b" | "B" | "c" | "C" | "d" | "D" | "e" | "E" | "f" | "F">;
export declare function isHexDigitCharacter(char: string): char is HexDigitCharacter;
export declare function getHexDigitNumber(char: HexDigitCharacter): HexNumber;
export declare function isRawHexNumberString(rawHex: string): boolean;
export declare function parseRawHexNumberString(rawHex: string): number;
//# sourceMappingURL=hex.d.ts.map