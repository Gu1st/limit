# harexs-limit

Promise-Async functions with limited concurrency

## Install

```
$ npm install @harexs/limit
```

## Usage

```js
import harexsLimit from "harexs-limit";
let limit = harexsLimit(3);

function sleep(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
}

limit(sleep, 1);
limit(sleep, 1.1);
limit(sleep, 1.2);
limit(sleep, 3);
limit(sleep, 1.3);
```
