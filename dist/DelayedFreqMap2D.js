"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayedFreqMap2D = void 0;
const Set2D_1 = require("./Set2D");
class DelayedFreqMap2D {
    constructor() {
        /**
         * An object that contains of two keys, one for each component of the 2D vector, and the final value being the frequency of the vector in this frequency map
         */
        this.value_lookup = new Map();
        /**
         * An object that contains of keys that represent the frequencies of each vector and a Set2D of each vector that corresponds to that frequency (not initialized until init_freq_data is called)
         */
        this.freq_lookup = new Map();
    }
    get_with_freqs_set_direct(...freqs) {
        const set = new Set2D_1.Set2D();
        for (const pair of this.value_lookup) {
            for (const secondPair of pair[1]) {
                const freq = secondPair[1];
                if (freqs.some(inputFreq => inputFreq === freq)) {
                    set.add(pair[0], secondPair[0]);
                }
            }
        }
        return set;
    }
    init_freq_data() {
        var _a;
        this.freq_lookup = new Map();
        for (const pair of this.value_lookup) {
            for (const secondPair of pair[1]) {
                const freq = secondPair[1];
                if (this.freq_lookup.has(freq)) {
                    (_a = this.freq_lookup.get(freq)) === null || _a === void 0 ? void 0 : _a.add(pair[0], secondPair[0]);
                }
                else {
                    this.freq_lookup.set(freq, new Set2D_1.Set2D([[pair[0], secondPair[0]]]));
                }
            }
        }
    }
    full_clear() {
        this.value_lookup = new Map();
        this.freq_lookup = new Map();
    }
    clear() {
        [...this.value_lookup.values()].forEach(secondMap => secondMap.clear());
        [...this.freq_lookup.values()].forEach(set2D => set2D.clear());
    }
    add(first, second, freqToAdd = 1) {
        if (Number.isInteger(freqToAdd) === false) {
            throw new Error("Frequencies must be integers in FreqMap2D");
        }
        if (freqToAdd < 0) {
            throw new Error("Frequencies must be positive in FreqMap2D");
        }
        if (freqToAdd === 0) {
            return;
        }
        let secondMap;
        if (secondMap = this.value_lookup.get(first)) {
            let freq;
            if (freq = secondMap.get(second)) {
                secondMap.set(second, freq + freqToAdd);
            }
            else {
                secondMap.set(second, freqToAdd);
            }
        }
        else {
            this.value_lookup.set(first, new Map([[second, freqToAdd]]));
        }
    }
    /**
     * Erases a 2D Value and all of its frequencies from the FreqMap
     * @param first
     * @param second
     */
    erase(first, second) {
        if (this.has(first, second)) {
            const freq = this.get_freq(first, second);
            let freqSet;
            if (freqSet = this.freq_lookup.get(freq)) {
                freqSet.remove(first, second);
                if (freqSet.length === 0) {
                    this.freq_lookup.delete(freq);
                }
            }
            let secondMap;
            if (secondMap = this.value_lookup.get(first)) {
                secondMap.delete(second);
                if (secondMap.size === 0) {
                    this.value_lookup.delete(first);
                }
            }
        }
        else {
            throw new Error(`Attempted to erase absent value ${first} ${second} from FreqMap2D`);
        }
    }
    /**
     * Erases one frequency of a 2D Value from the FreqMap
     * @param first
     * @param second
     */
    remove(first, second) {
        if (this.has(first, second)) {
            const freq = this.get_freq(first, second);
            if (freq === 1) {
                this.erase(first, second);
            }
            else if (freq > 1) {
                let freqSet;
                if (freqSet = this.freq_lookup.get(freq)) {
                    freqSet.remove(first, second);
                    if (freqSet.length === 0) {
                        this.freq_lookup.delete(freq);
                    }
                }
                const next_freq = freq - 1;
                let nextFreqSet2D;
                if (nextFreqSet2D = this.freq_lookup.get(next_freq)) {
                    nextFreqSet2D.add(first, second);
                }
                else {
                    this.freq_lookup.set(next_freq, new Set2D_1.Set2D([[first, second]]));
                }
                let secondMap;
                if (secondMap = this.value_lookup.get(first)) {
                    secondMap.set(second, next_freq);
                }
            }
        }
        else {
            throw new Error(`Attempted to remove absent value ${first} ${second} from FreqMap2D`);
        }
    }
    has(row, col) {
        var _a;
        return ((_a = this.value_lookup.get(row)) === null || _a === void 0 ? void 0 : _a.has(col)) || false;
    }
    get_freq(row, col) {
        var _a;
        const freq = (_a = this.value_lookup.get(row)) === null || _a === void 0 ? void 0 : _a.get(col);
        return freq !== undefined ? freq : 0;
    }
    get_with_freq(freq) {
        if (Number.isInteger(freq) === false) {
            throw new Error("Frequencies must be integers in FreqMap2D");
        }
        if (freq < 0) {
            throw new Error("Frequencies must be positive in FreqMap2D");
        }
        let freqSet;
        if (freqSet = this.freq_lookup.get(freq)) {
            return freqSet.getTuples();
        }
        return [];
    }
    get_with_freqs(...freqs) {
        return freqs.flatMap(freq => this.get_with_freq(freq));
    }
    get_with_freq_set(freq) {
        if (Number.isInteger(freq) === false) {
            throw new Error("Frequencies must be integers in FreqMap2D");
        }
        let freqSet;
        if (freqSet = this.freq_lookup.get(freq)) {
            return new Set2D_1.Set2D(freqSet);
        }
        return new Set2D_1.Set2D();
    }
    get_with_freqs_set(...freqs) {
        return freqs.filter(freq => this.freq_lookup.has(freq))
            .map(freq => this.freq_lookup.get(freq))
            .reduce((prev, curr) => prev.combine(curr), new Set2D_1.Set2D());
    }
}
exports.DelayedFreqMap2D = DelayedFreqMap2D;
