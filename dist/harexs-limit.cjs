'use strict';

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

module.exports = harexsLimit;
