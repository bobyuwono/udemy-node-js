const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('Success')
        reject('Things went wrong')
        
    },1000)
})

doWorkPromise.then( (result) =>{
    console.log('success', result)
}).catch((error)=>{
    console.log('error', error)
})