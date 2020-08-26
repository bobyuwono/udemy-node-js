require ('../src/db/mongoose')
const User = require('../src/models/user')

const updateAgeAndCount = async (ide,age) =>{
    const user  = await User.findByIdAndDelete(id, { age} )
    const number  = await User.countDocuments({age})
    return count
}


updateAgeAndCount()