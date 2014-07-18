﻿var _ = require('./util');
var pipeline = require('./pipeline');


/** Install the specified mod to alter the global behaviour of asyncawait. */
function use(mod) {
    // Ensure all global mods are install before any async(...) calls are made.
    if (pipeline.isLocked)
        throw new Error('use: cannot alter mods after first async(...) call');

    //TODO: handle ordering properly - may need to separate builtins from use-added stuff
    var mods = pipeline.mods;
    mods.push(mod);
    pipeline.reset();
    var len = mods.length;
    for (var i = len - 1; i >= 0; --i) {
        var previous = _.mergeProps({}, pipeline);
        var overrides = mods[i](previous);
        _.mergeProps(pipeline, overrides);
    }
}
module.exports = use;
//# sourceMappingURL=use.js.map