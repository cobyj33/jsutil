import { Set2D } from "./Set2D";

export class FreqMap2D {
    /**
     * An object that contains of two keys, one for each component of the 2D vector, and the final value being the frequency of the vector in this frequency map
     */
    private valueLookup: Map<number, Map<number, number>> = new Map<number, Map<number, number>>()

    /**
     * An object that contains of keys that represent the frequencies of each vector and a Set2D of each vector that corresponds to that frequency
     */
    private freqLookup: Map<number, Set2D> = new Map<number, Set2D> ()
    
    constructor() {}

    clear(total: boolean = false): void {
        if (total) {
            this.valueLookup = new Map();
            this.freqLookup = new Map();
        } else {
            [...this.valueLookup.values()].forEach(secondMap => secondMap.clear());
            [...this.freqLookup.values()].forEach(set2D => set2D.clear());
        }
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
        if (secondMap = this.valueLookup.get(first)) {
            let freq: number | undefined
            if (freq = secondMap.get(second)) {
                secondMap.set(second, freq + freqToAdd);
                current_freq = freq + freqToAdd;
            } else {
                secondMap.set(second, freqToAdd)
            }
        } else {
            this.valueLookup.set(first, new Map<number, number>([[second, freqToAdd]]))
        }

        let last_freq = current_freq - freqToAdd;
        let lastFreqSet2D: Set2D | undefined
        if (lastFreqSet2D = this.freqLookup.get(last_freq)) {
            if (lastFreqSet2D.has(first, second)) {
                lastFreqSet2D.remove(first, second);

                // if (lastFreqSet2D.length === 0) {
                //     this.freqLookup.delete(last_freq)
                // }
            }
        }

        let currentFreqSet2D: Set2D | undefined
        if (currentFreqSet2D = this.freqLookup.get(current_freq)) {
            currentFreqSet2D.add(first, second)
        } else {
            this.freqLookup.set(current_freq, new Set2D([[first, second]]));
        }
    }

    /**
     * Erases a 2D Value and all of its frequencies from the FreqMap
     * @param first 
     * @param second 
     */
    erase(first: number, second: number) {
        if (this.has(first, second)) {
            const freq: number = this.getFreq(first, second);

            let freqSet: Set2D | undefined;
            if (freqSet = this.freqLookup.get(freq)) {
                freqSet.remove(first, second)
                if (freqSet.length === 0) {
                    this.freqLookup.delete(freq)
                }
            }

            let secondMap: Map<number, number> | undefined;
            if (secondMap = this.valueLookup.get(first)) {
                secondMap.delete(second)
                if (secondMap.size === 0) {
                    this.valueLookup.delete(first);
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

            const freq: number = this.getFreq(first, second);
            if (freq === 1) {
                this.erase(first, second)
            } else if (freq > 1) {

                let freqSet: Set2D | undefined;
                if (freqSet = this.freqLookup.get(freq)) {
                    freqSet.remove(first, second)
                    if (freqSet.length === 0) {
                        this.freqLookup.delete(freq)
                    }
                }
                
                const next_freq = freq - 1;
                let nextFreqSet2D: Set2D | undefined
                if (nextFreqSet2D = this.freqLookup.get(next_freq)) {
                    nextFreqSet2D.add(first, second)
                } else {
                    this.freqLookup.set(next_freq, new Set2D([[first, second]]))
                }

                let secondMap: Map<number, number> | undefined;
                if (secondMap = this.valueLookup.get(first)) {
                    secondMap.set(second, next_freq)
                }
            }


        } else {
            throw new Error(`Attempted to remove absent value ${first} ${second} from FreqMap2D`)
        }
    }

    has(row: number, col: number): boolean {
        return this.valueLookup.get(row)?.has(col) || false
    }

    getFreq(row: number, col: number): number {
        const freq = this.valueLookup.get(row)?.get(col)
        return freq !== undefined ? freq : 0;
    }

    getWithFreq(...freqs: number[]): [number, number][] {
        return freqs.flatMap(freq => {
            if (Number.isInteger(freq) === false) {
                throw new Error("Frequencies must be integers in FreqMap2D");
            }
            if (freq < 0) {
                throw new Error("Frequencies must be positive in FreqMap2D");
            }
    
            let freqSet: Set2D | undefined
            if (freqSet =  this.freqLookup.get(freq)) {
                return freqSet.getTuples();
            }
            return []
        })
    }

    getSetWithFreq(...freqs: number[]): Set2D {
        for (let i = 0; i < freqs.length; i++) {
            if (Number.isInteger(freqs[i]) === false) {
                throw new Error("Frequencies must be integers in FreqMap2D");
            }
            if (freqs[i] < 0) {
                throw new Error("Frequencies must be positive in FreqMap2D");
            }
        }

        return freqs.filter(freq => this.freqLookup.has(freq))
                .map(freq => this.freqLookup.get(freq) as Set2D)
                .reduce((prev, curr) => prev.combine(curr), new Set2D());
    }
}