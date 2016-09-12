import test from "tape"
import {EdelGraph} from "../src"

test("EdelhGraph", (suite) => {
    "use strict";

    suite.test('colors', (cAssert) => {
        const c = new EdelGraph({foo: 1, bar: 2, vey: 3, con: 4, delta: 50});
        const colorStrings = [];
        let dataSet = 'a,b,c,d,e'.split(','); // a 5-item array
        for (let i = 0; i < 5; ++i) {
            colorStrings.push(c.colorFn({index: i}, dataSet, c).hslString());
        }
        cAssert.deepEqual(colorStrings, require('./expect/EdelGraph/colors.json'));
        cAssert.end();
    });

    suite.test('data', (dAssert) => {
        const c = new EdelGraph({foo: 1, bar: 2, vey: 4, con: 10, delta: 50});
        const dataSet = c.dataSet;
        dAssert.deepEqual(dataSet, require('./expect/EdelGraph/dataSet.json'));

        dAssert.end();
    });

    suite.end();
});
