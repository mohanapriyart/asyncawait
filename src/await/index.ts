﻿import references = require('references');
//TODO: temp... require('../src/extensibility').config({ handlers: [ promise.handler, cps.handler, thunk.handler, general, value ]});
import promisesMod = require('../mods/promises');
import callbacksMod = require('../mods/callbacks');
//import cps = require('./cps');
import thunk = require('./thunk');
export = api;


//TODO: temp testing...
import compound = require('./compound');
var value = {
    singular: (fi, arg) => {
        setImmediate(() => { fi.resume(null, arg); });
    },
    variadic: (fi, args) => {
        setImmediate(() => { fi.resume(null, args[0]); });
    },
    elements: () => 0
};




//TODO: temp testing...
var promise = promisesMod.createAwaitBuilder();
var cps = callbacksMod.createAwaitBuilder();
var opts = { handlers: [ promise.handlers, cps.handlers, thunk.handlers, value ]};
var api: AsyncAwait.Await.API = <any> compound.mod({ defaultOptions: opts });//TODO: review awkward syntax, just want to pass opts
//api.cps = <any> cps;
api.thunk = <any> thunk;