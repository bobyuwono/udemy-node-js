
const add = (a,b, callback) => {
    setTimeout(() => {
        callback( undefined,  a+b)        
    }, 2000);
}

add ( 1, 4, (sum, error) => {
    if (error){
        return console.log('gagal euy')
    }

    console.log(sum)
} )