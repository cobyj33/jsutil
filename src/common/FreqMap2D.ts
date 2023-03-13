import { Set2D } from "./Set2D";

export class FreqMap2D {
    /**
     * An object that contains of two keys, one for each component of the 2D vector, and the final value being the frequency of the vector in this frequency map
     */
    private value_lookup: Map<number, Map<number, number>> = new Map<number, Map<number, number>>()

    /**
     * An object that contains of keys that represent the frequencies of each vector and a Set2D of each vector that corresponds to that frequency
     */
    private freq_lookup: Map<number, Set2D> = new Map<number, Set2D> ()
    
    constructor() {}

    full_clear() {
        this.value_lookup = new Map();
        this.freq_lookup = new Map();
    }

    clear(): void {
        [...this.value_lookup.values()].forEach(secondMap => secondMap.clear());
        [...this.freq_lookup.values()].forEach(set2D => set2D.clear());
    }

    add(first: number, second: number, freqToAdd: number = 1) {
        if (Number.isInteger(freqToAdd) === false) {
            throw new Error("Frequencies must be integers in FreqMap2D");
        }
        if (freqToAdd < 0) {
            throw new Error("Frequencies must be positive in FreqMap2D");
        }
        if (freqToAdd === 0) {
            return;
        }

        let secondMap: Map<number, number> | undefined;
        let current_freq = freqToAdd; //assumes that there is no instances in the FreqMap2D
        if (secondMap = this.value_lookup.get(first)) {
            let freq: number | undefined
            if (freq = secondMap.get(second)) {
                secondMap.set(second, freq + freqToAdd);
                current_freq = freq + freqToAdd;
            } else {
                secondMap.set(second, freqToAdd)
            }
        } else {
            this.value_lookup.set(first, new Map<number, number>([[second, freqToAdd]]))
        }

        let last_freq = current_freq - freqToAdd;
        let lastFreqSet2D: Set2D | undefined
        if (lastFreqSet2D = this.freq_lookup.get(last_freq)) {
            if (lastFreqSet2D.has(first, second)) {
                lastFreqSet2D.remove(first, second);

                // if (lastFreqSet2D.length === 0) {
                //     this.freq_lookup.delete(last_freq)
                // }
            }
        }

        let currentFreqSet2D: Set2D | undefined
        if (currentFreqSet2D = this.freq_lookup.get(current_freq)) {
            currentFreqSet2D.add(first, second)
        } else {
            this.freq_lookup.set(current_freq, new Set2D([[first, second]]));
        }
    }

    /**
     * Erases a 2D Value and all of its frequencies from the FreqMap
     * @param first 
     * @param second 
     */
    erase(first: number, second: number) {
        if (this.has(first, second)) {
            const freq: number = this.get_freq(first, second);

            let freqSet: Set2D | undefined;
            if (freqSet = this.freq_lookup.get(freq)) {
                freqSet.remove(first, second)
                if (freqSet.length === 0) {
                    this.freq_lookup.delete(freq)
                }
            }

            let secondMap: Map<number, number> | undefined;
            if (secondMap = this.value_lookup.get(first)) {
                secondMap.delete(second)
                if (secondMap.size === 0) {
                    this.value_lookup.delete(first);
                }
            }
        } else {
            throw new Error(`Attempted to erase absent value ${first} ${second} from FreqMap2D`)
        }
    }

    /**
     * Erases one frequency of a 2D Value from the FreqMap
     * @param first 
     * @param second 
     */
    remove(first: number, second: number) {
        if (this.has(first, second)) {

            const freq: number = this.get_freq(first, second);
            if (freq === 1) {
                this.erase(first, second)
            } else if (freq > 1) {

                let freqSet: Set2D | undefined;
                if (freqSet = this.freq_lookup.get(freq)) {
                    freqSet.remove(first, second)
                    if (freqSet.length === 0) {
                        this.freq_lookup.delete(freq)
                    }
                }
                
                const next_freq = freq - 1;
                let nextFreqSet2D: Set2D | undefined
                if (nextFreqSet2D = this.freq_lookup.get(next_freq)) {
                    nextFreqSet2D.add(first, second)
                } else {
                    this.freq_lookup.set(next_freq, new Set2D([[first, second]]))
                }

                let secondMap: Map<number, number> | undefined;
                if (secondMap = this.value_lookup.get(first)) {
                    secondMap.set(second, next_freq)
                }
            }


        } else {
            throw new Error(`Attempted to remove absent value ${first} ${second} from FreqMap2D`)
        }
    }

    has(row: number, col: number): boolean {
        return this.value_lookup.get(row)?.has(col) || false
    }

    get_freq(row: number, col: number): number {
        const freq = this.value_lookup.get(row)?.get(col)
        return freq !== undefined ? freq : 0;
    }

    get_with_freq(freq: number): Array<[number, number]> {
        if (Number.isInteger(freq) === false) {
            throw new Error("Frequencies must be integers in FreqMap2D");
        }
        if (freq < 0) {
            throw new Error("Frequencies must be positive in FreqMap2D");
        }

        let freqSet: Set2D | undefined
        if (freqSet =  this.freq_lookup.get(freq)) {
            return freqSet.getTuples();
        }
        return []
    }

    get_with_freqs(...freqs: number[]): Array<[number, number]> {
        return freqs.flatMap(freq => this.get_with_freq(freq))
    }

    get_with_freq_set(freq: number): Set2D {
        if (Number.isInteger(freq) === false) {
            throw new Error("Frequencies must be integers in FreqMap2D");
        }

        let freqSet: Set2D | undefined
        if (freqSet =  this.freq_lookup.get(freq)) {
            return new Set2D(freqSet);
        }
        return new Set2D();
    }

    get_with_freqs_set(...freqs: number[]): Set2D {
        return freqs.filter(freq => this.freq_lookup.has(freq))
                .map(freq => this.freq_lookup.get(freq) as Set2D)
                .reduce((prev, curr) => prev.combine(curr), new Set2D());
    }
}