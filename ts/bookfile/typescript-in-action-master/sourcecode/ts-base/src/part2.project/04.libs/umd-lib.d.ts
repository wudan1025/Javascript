declare namespace umdLib {
    const version: string
    function doSomething(): void
}

// umd 库不可缺少
export as namespace umdLib

export = umdLib
