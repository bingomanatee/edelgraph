"use strict";

import fs from 'fs';

fs.readdirSync(__dirname).forEach((name) => {
    if (/tests\.js$/.test(name)){
        require(`./${name}`);
    }
});
