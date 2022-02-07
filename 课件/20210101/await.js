// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function

var resolveAfter2Seconds = function resolveAfter2Seconds() {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

var resolveAfter1Second = function resolveAfter1Second() {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

// sequential:相继的 /[sɪˈkwenʃl]/
var sequential = async function sequential() {
    console.log('==SEQUENTIAL START==');
    const slow = await resolveAfter2Seconds();
    console.log(slow);
    const fast = await resolveAfter1Second();
    console.log(fast);
};

// concurrent:同时发生的 /[kənˈkʌrənt]/
var concurrent = async function concurrent() {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();
    console.log(await slow);
    console.log(await fast);
};

var concurrentPromise = function concurrentPromise() {
    console.log('==CONCURRENT START with Promise.all==');
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()])
        .then((messages) => {
            console.log(messages[0]);
            console.log(messages[1]);
        });
};

// parallel:平行的 /[ˈpærəlel]/
var parallel = async function parallel() {
    console.log('==PARALLEL with await Promise.all==');
    await Promise.all([
        (async () => {
            let result = await resolveAfter2Seconds();
            console.log(result);
        })(),
        (async () => {
            let result = await resolveAfter1Second();
            console.log(result);
        })(),
    ]);
};

var parallelPromise = function parallelPromise() {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
};

// sequential();
// concurrent();
// concurrentPromise();
parallel();
// parallelPromise();