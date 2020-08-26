// const { rejects } = require("assert")
// const { resolve } = require("path")

// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(()=>{
        
//         reject('Things went wrong')
//         resolve('Success')
        
//     },10000)
// })

// doWorkPromise.then( (result) =>{
//     console.log('success', result)
// }).catch((error)=>{
//     console.log('error', error)
// })

const add = (a,b) =>{
    return new Promise( (resolve,reject)=>{
        setTimeout(() => {
            resolve (a+b)
            reject(null)
        }, 20);
    })
}

// add(5,9).then( (result) =>{
//     console.log(result)
// }).catch( (e) =>{
//     console.log(e)
// })

add(9,8).then( (result) =>{
    console.log(result)
    return add(result, 9)
}).catch( (e) =>{
    console.log(e)
})