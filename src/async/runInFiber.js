﻿var Fiber = require('fibers');
var AsyncOutput = require('./asyncOutput');


/**
* The runInFiber() function accepts a RunContext instance, and calls the wrapped function
* as specified in this context. The result of the call is used to resolve the context's
* promise. If an exception is thrown, the context's promise is rejected. This function
* must take all its information in a single argument (i.e. the RunContext), because it is
* called via Fiber#run(), which accepts at most one argument.
*/
function runInFiber(runCtx) {
    try  {
        // Track the number of currently active fibers
        adjustFiberCount(+1);

        // Call the wrapped function. It may be suspended several times (at await and/or yield calls).
        var result = runCtx.wrapped.apply(runCtx.thisArg, runCtx.argsAsArray);

        switch (runCtx.output) {
            case 0 /* Promise */:
                runCtx.value.resolve(result);
                break;
            case 1 /* PromiseIterator */:
                runCtx.value.resolve(undefined);
                runCtx.done.resolve(true);
                break;
        }
    } catch (err) {
        switch (runCtx.output) {
            case 0 /* Promise */:
                runCtx.value.reject(err);
                break;
            case 1 /* PromiseIterator */:
                runCtx.value.reject(err);
                runCtx.done.resolve(true);
                break;
        }
    } finally {
        // Track the number of currently active fibers
        adjustFiberCount(-1);

        // TODO: for semaphores
        runCtx.semaphore.leave();
    }
}

/**
* The following functionality prevents memory leaks in node-fibers by actively managing Fiber.poolSize.
* For more information, see https://github.com/laverdet/node-fibers/issues/169.
*/
function adjustFiberCount(delta) {
    activeFiberCount += delta;
    if (activeFiberCount >= fiberPoolSize) {
        fiberPoolSize += 100;
        Fiber.poolSize = fiberPoolSize;
    }
}
var fiberPoolSize = Fiber.poolSize;
var activeFiberCount = 0;
module.exports = runInFiber;
//# sourceMappingURL=runInFiber.js.map