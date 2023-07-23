(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.harexsLimit = factory());
})(this, (function () { 'use strict';

    function harexsLimit(maxCount) {
        let activeCount = 0;
        let waitTask = [];
        const execute = (asyncFn, ...args) => {
            return new Promise((resolve, reject) => {
                const task = create(asyncFn, args, resolve, reject);
                if (activeCount >= maxCount) {
                    waitTask.push(task);
                }
                else {
                    task();
                }
            });
        };
        const create = (asyncFn, args, resolve, reject) => {
            return () => {
                asyncFn(...args)
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                    activeCount--;
                    if (waitTask.length) {
                        waitTask.shift()();
                    }
                });
                activeCount++;
            };
        };
        return execute;
    }

    return harexsLimit;

}));
