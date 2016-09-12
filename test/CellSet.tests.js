import test from "tape"
import {CellSet} from "../src"

test("CellSet", (suite) => {
    //t.plan(1);

    suite.test('constructor', (cAssert) => {
        "use strict";
        let SIZE = 2;

        let c = new CellSet(false, SIZE);

        cAssert.equal(c.size, SIZE, 'size');
        cAssert.equal(c.left, 0, 'left');
        cAssert.equal(c.top, SIZE, 'top');
        cAssert.equal(c.bottom, 0, 'bottom');
        cAssert.equal(c.right, SIZE, 'right');

        cAssert.end();
    });

    suite.test('divideAll', (dAssert) => {
        "use strict";

        let SIZE = 2;
        let DIVS = 4;

        let c = new CellSet(false, SIZE);

        c.divideAll(DIVS);
        let strs = [];
        for (let child of c.children) {
            dAssert.equal(child.size, SIZE/DIVS, 'child size');
            strs.push(child.toString());
        }

        dAssert.deepEqual(strs, require('./expect/CellSet/childStrings.json'), 'child strings');

        dAssert.end();
    });

    suite.end();
});
