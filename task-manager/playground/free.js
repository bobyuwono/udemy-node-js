const add = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) {
            return reject('Numbers must be non-negative')
        }
        resolve(a + b)

    })
}


const doWork = async () => {
    const sum = await add(1, 99)
    console.log(sum)
    const sum2 = await add(sum, 8)
    console.log(sum2)
    const sum3 = await add(sum2, 3)
    return sum3
}

doWork().then((result) => {
    console.log('result', result)
}).catch((e) => {
    console.log('e', e)
})