﻿//TODO: temp... require('../src/extensibility').config({ handlers: [ promise.handler, cps.handler, thunk.handler, general, value ]});
var promisesMod = require('../mods/promises');
var callbacksMod = require('../mods/callbacks');

//import cps = require('./cps');
var thunk = require('./thunk');

//TODO: temp testing...
var compound = require('./compound');
var value = {
    singular: function (fi, arg) {
        setImmediate(function () {
            fi.resume(null, arg);
        });
    },
    variadic: function (fi, args) {
        setImmediate(function () {
            fi.resume(null, args[0]);
        });
    },
    elements: function () {
        return 0;
    }
};

//TODO: temp testing...
var promise = promisesMod.createAwaitBuilder();
var cps = callbacksMod.createAwaitBuilder();
var opts = { handlers: [promise.handlers, cps.handlers, thunk.handlers, value] };
var api = compound.mod({ defaultOptions: opts });

//api.cps = <any> cps;
api.thunk = thunk;
module.exports = api;
//# sourceMappingURL=index.js.map