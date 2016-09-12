"use strict";
/**
 *
 * CellSet is a fractally dividable square region.
 *
 * The root fractal goes from 0..size in X
 *                  and from 0..size in Y.
 *
 * all other cells exist in that region, being a rectangular slice of their parent.
 *
 * Each region is sliced in the same number of divisions in x and y.
 *
 */

class CellSet {

    constructor (parent, a, b, c) {

        if (!parent) {
            this.size = a || 1;
            this.parentLeft = 0;
            this.parentTop = 0;
            this.divisions = 1;
        } else {
            this.parent = parent;
            this.parentLeft = a;
            this.parentTop = b;
            this.divisions = c;
        }

        this.children = [];
    }

    get root () {
        if (!this.parent) {
            return this;
        }
        return this.parent.root();
    }

    /**
     * @param val {CellSet}
     */
    set parent (val) {
        this._parent = val;
    }

    /**
     *
     * @returns {CellSet}
     */
    get parent () {
        return this._parent;
    }

    /**
     *
     * @param val {Number}
     */
    set divisions (val) {
        this._divisions = val;
    }

    /**
     *
     * @returns {Number}
     */
    get divisions () {
        return this._divisions;
    }

    /**
     *
     * @param val {Number}
     */
    set size (val) {
        this._size = val;
    }

    /**
     *
     * @returns {Number}
     */
    get size () {
        if (this.parent) {
            return this.parent.size / this.divisions;
        }
        return this._size;
    }

    /**
     *
     * @param val
     */
    set parentLeft (val) {
        this._parentLeft = val;
    }

    get parentLeft () {
        return this._parentLeft;
    }

    /**
     *
     * @param val {Number}
     */
    set parentTop (val) {
        this._parentTop = val;
    }

    /**
     *
     * @returns {Number}
     */
    get parentTop () {
        return this._parentTop;
    }

    get centerX () {
        return (this.left + this.right) / 2;
    }

    get centerY () {
        return (this.top + this.bottom) / 2;
    }

    get left () {
        if (!this.parent) {
            return 0;
        } else {
            return this.parent.parentLeft + this.size * this.parentLeft;
        }
    }

    get top () {
        if (!this.parent) {
            return this.size;
        } else {
            return this.parent.parentTop + this.size * ( 1 + this.parentTop);
        }
    }

    get right () {
        if (!this.parent) {
            return this.size;
        } else {
            return this.parent.parentLeft + this.size * (1 + this.parentLeft);
        }
    }

    get bottom () {
        if (!this.parent) {
            return 0;
        } else {
            return this.parent.parentTop + this.size * this.parentTop;
        }
    }

    /**
     * create a child cell for every cell.
     * This will wipe out any child content.
     * @param d {Number} divisions;
     */
    divideAll (d) {
        this.children = [];
        for (let x = 0; x < d; ++x) {
            for (let y = 0; y < d; ++y) {
                let child = new CellSet(this, x, y, d);
                this.children.push(child);
            }
        }
    }

    toString () {
        return `CellSet: ${this.parentTop}x${this.parentLeft}: size ${this.size} (${this.left} ~ ${this.right}, ${this.bottom} ~ ${this.top})`;
    }

    angle () {
        return Math.atan2(this.centerY - this.root.centerY, this.centerX - this.root.centerX);
    }

}

CellSet.TL = 0;
CellSet.TR = 1;
CellSet.BL = 2;
CellSet.BR = 3;

export default CellSet;
