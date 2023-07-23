export default function harexsLimit(maxCount: number) {
  let activeCount = 0;
  let waitTask: any[] = [];

  const execute = (asyncFn: Function, ...args: any[]) => {
    return new Promise((resolve, reject) => {
      const task = create(asyncFn, args, resolve, reject);
      if (activeCount >= maxCount) {
        waitTask.push(task);
      } else {
        task();
      }
    });
  };

  const create = (
    asyncFn: Function,
    args: any[],
    resolve: Function,
    reject: Function
  ) => {
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
