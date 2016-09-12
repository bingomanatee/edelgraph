

export default (n, p) => {
    "use strict";
    const offset = Math.pow(10, p);
    return Math.round(n * offset)/offset;
}
