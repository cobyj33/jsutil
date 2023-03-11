
export const HEX_DIGIT_CHARS_TO_NUMBERS = {
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
} as const

export type HexDigitCharacter = keyof typeof HEX_DIGIT_CHARS_TO_NUMBERS
export type HexNumber = typeof HEX_DIGIT_CHARS_TO_NUMBERS[HexDigitCharacter]

export const HEX_DIGIT_CHARS = Object.keys(HEX_DIGIT_CHARS_TO_NUMBERS) as HexDigitCharacter[]
export const HEX_DIGIT_CHARS_SET = Object.freeze(new Set(HEX_DIGIT_CHARS)) as Set<HexDigitCharacter>

export function isHexDigitCharacter(char: string): char is HexDigitCharacter {
    return HEX_DIGIT_CHARS_SET.has(char as HexDigitCharacter)
}

export function getHexDigitNumber(char: HexDigitCharacter): HexNumber {
    return HEX_DIGIT_CHARS_TO_NUMBERS[char]
}

export function isRawHexNumberString(rawHex: string) {
    return rawHex.split("").every(char => isHexDigitCharacter(char))
}

export function parseRawHexNumberString(rawHex: string) {
    if (isRawHexNumberString(rawHex)) {
        let num = 0;
        for (let placeValue = 0; placeValue < rawHex.length; placeValue++) {
            const rawHexIndex = rawHex.length - 1 - placeValue;
            num += getHexDigitNumber(rawHex[rawHexIndex] as HexDigitCharacter) * Math.pow(16, placeValue)
        }
        return num
    }

    throw new Error(`Cannot parse invalid raw hex number ${rawHex}`)
}