import test from "tape"
import roundTo from '../src/utils/roundTo';

test("roundTo", (suite) => {
    "use strict";

    suite.equal(roundTo(1, 2), 1.00, '1.00');
    suite.equal(roundTo(Math.PI, 2), 3.14, '3.14');
    suite.end();
});
