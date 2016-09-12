"use strict";

import CellSet from './CellSet';
import _ from 'lodash';
import color from 'color';
import round2 from './utils/roundTo';

function _getColor (item, dataSet, graph) {
    const choices = dataSet.length;
    let out = null;
    const firstColor = graph.seedColors.base.clone().rotate(10).blacken(0.25);


    const lastColor = graph.seedColors.base.clone().rotate(-10).whiten(0.25);
    if (item.index === 0) {
        out = firstColor;
    } else if (item.index === dataSet.length) {
        return lastColor;
    } else {
        const mixture = (choices - item.index - 1) / (choices - 1);
        out = firstColor.mix(lastColor, mixture);
    }

 /*   console.log(
        'index: ', item.index,
        'first: ', firstColor.hslString(),
        'last:', lastColor.hslString(),
        'out: ', out.hslString()
    );*/

    return out;
}

const DEFAULT_SEED_COLORS = {
    base: color().hsl(120, 100, 50)
};

class EdelGraph {
    constructor (data, divisions, colorFn, seedColors) {
        this._data = data || {};
        this._divisions = divisions | 8;

        this._cells = new CellSet(false, 1024);
        this.cells.divideAll(this.divisions);
        this.colorFn = colorFn || _getColor;
        this.seedColors = seedColors || _.clone(DEFAULT_SEED_COLORS);
    }

    get divisions () {
        return this._divisions;
    }

    /**
     *
     * @returns {Array}
     */
    get data () {
        return this._data;
    }

    /**
     *
     * @returns {CellSet}
     */
    get cells () {
        return this._cells;
    }

    get dataSet () {
        var count = this.cells.children.length;
        var dataSet = [];
        var total = 0;
        for (let item in this.data) {
            let count = this.data[item];
            total += count;
            dataSet.push({
                name: item,
                amount: count
            });
        }
        for (let cell of dataSet) {
            cell.cells = count * (cell.amount / total);
        }

        dataSet = _.sortBy(dataSet, (cell) => {
            cell.amount * -1;
        });

        var runningTotal = 0;
        var index = 0;
        for (let sCell of dataSet) {
            runningTotal += sCell.cells;
            sCell.runningTotal = round2(runningTotal, 2);
            sCell.cells = round2(sCell.cells, 2);
            sCell.index = index;
            ++index;
        }

        return dataSet;
    }
}

export default EdelGraph;
