import { Set2D } from "./Set2D";
export declare class DelayedFreqMap2D {
    /**
     * An object that contains of two keys, one for each component of the 2D vector, and the final value being the frequency of the vector in this frequency map
     */
    private value_lookup;
    /**
     * An object that contains of keys that represent the frequencies of each vector and a Set2D of each vector that corresponds to that frequency (not initialized until init_freq_data is called)
     */
    private freq_lookup;
    constructor();
    get_with_freqs_set_direct(...freqs: number[]): Set2D;
    init_freq_data(): void;
    full_clear(): void;
    clear(): void;
    add(first: number, second: number, freqToAdd?: number): void;
    /**
     * Erases a 2D Value and all of its frequencies from the FreqMap
     * @param first
     * @param second
     */
    erase(first: number, second: number): void;
    /**
     * Erases one frequency of a 2D Value from the FreqMap
     * @param first
     * @param second
     */
    remove(first: number, second: number): void;
    has(row: number, col: number): boolean;
    get_freq(row: number, col: number): number;
    get_with_freq(freq: number): Array<[number, number]>;
    get_with_freqs(...freqs: number[]): Array<[number, number]>;
    get_with_freq_set(freq: number): Set2D;
    get_with_freqs_set(...freqs: number[]): Set2D;
}
//# sourceMappingURL=DelayedFreqMap2D.d.ts.map