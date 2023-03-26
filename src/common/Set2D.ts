/**
 * @author Jacoby Johnson 
 * @file src/common/Set2D.ts
 * @brief A Set implementation to hold a unique set of 2D vector values that can easily be queried for existence and iterated over
 * @version 0.1.0
 * @date 2023-3-26
 */

import { IVector2 } from './Vector2';

export class Set2D {
    /**
     * @brief This map internally holds all of the data to query into the Set2D. 
     * 
     * @summary It consists of a key which represents the first component of a 2-dimensional vector,
     * with a set of number values which represent any second component values associated with the given first component
     */
    private map: Map<number, Set<number>> = new Map<number, Set<number>>();

    /**
     * @brief the internally tracked length of the set
     */
    private _length: number;

    constructor(values: Array<[number, number]> | Set2D = []) {
        this._length = 0;
        values.forEach(value => this.add(value[0], value[1])); 
    }

    clear(total: boolean = false): void {
        if (total) {
            this.map = new Map();
        } else {
            [...this.map.values()].forEach(set => set.clear())
        }
        this._length = 0;
    }

    get length(): number { return this._length } 

    static fromVector2DArray(values: IVector2[]): Set2D {
        const set2D: Set2D = new Set2D();
        values.forEach(value => set2D.add(value.row, value.col));
        return set2D
    }

    getTuples(): Array<[number, number]> {
        const arr = new Array<[number, number]>(this.length)
        let i = 0;
        this.forEach((pair) => {
            arr[i] = pair
            i++;
        })

        return arr
    }

    getPairs(): IVector2[] {
        return this.getTuples().map(([row, col]) => ({ row: row, col: col }))
    }

    forEach(callbackfn: (curr: [number, number]) => void) {
        this.map.forEach((set, first) => set.forEach(second => callbackfn([first, second])   ))
    }
    
    add(first: number, second: number): void {
        if (this.map.get(first)?.has(second) === false) {
            this.map.get(first)?.add(second); 
            this._length += 1;
        } else if (this.map.has(first) === false) {
            this.map.set(first, new Set<number>([second]))
            this._length += 1;
        }

    }

    remove(first: number, second: number): void {
        let set: Set<number> | undefined
        if (set = this.map.get(first)) {
            if (set.has(second)) {
                set.delete(second)
                this._length -= 1;
                if (set.size === 0) { 
                    this.map.delete(first)
                }
            }
        }
    }

    has(first: number, second: number): boolean {
        return this.map.get(first)?.has(second) || false;
    }

    hasAll(tuples: Array<[number, number]>): boolean {
        return tuples.every(tuple => this.has(tuple[0], tuple[1]));
    }

    hasAllExact(tuples: Array<[number, number]>): boolean {
        return tuples.length === this.length && this.hasAll(tuples);
    }

    combine(...others: (Set2D | [number, number])[]): Set2D {
        const set = new Set2D();
        set.push(this, ...others);
        return set;
    }

    /**
     * Pushes a set2D
     */
    push(...others: (Set2D | [number, number])[]): void {
        others.forEach(other => Array.isArray(other) ? this.add(other[0], other[1]) : other.forEach(tuple => this.add(tuple[0], tuple[1])) );
    }

    *[Symbol.iterator](): IterableIterator<[number, number]> {
        for (const pair of this.map) {
            for (const second of pair[1]) {
                yield [pair[0], second]
            }
        }
    }

    equals(other: Set2D): boolean {
        if (this.length !== other.length) {
            return false;
        }
        
        for ( const entry of this ) {
            if (other.has(entry[0], entry[1]) === false) {
                return false;
            }
        }
        return true;
    }
}