const{ MongoClient, ObjectID } = require('mongodb')

const assert = require('assert')

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'



const updateOne = (db, subFolder,column, value, callback) =>{
    const collection = db.collection(subFolder)
    collection.deleteONe( {column:value}, (error, result ) =>{
        assert.equal(err,null)
        console.log('successfully deleted')
        callback(result)               
    })
}

const deleteONe = (db, subFolder,column, value, callback) =>{
    const collection = db.collection(subFolder)
    collection.deleteONe( {column:value}, (error, result ) =>{
        assert.equal(err,null)
        console.log('successfully deleted')
        callback(result)               
    })
}

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => 
{   
    assert.equal(null,err)
    console.log("Unable to connect to database")
    
    const db = client.db(dbName)

    col = db.collection('task')

    col.deleteOne({'description':'cleaning house'}, (err,res) =>{
        assert.equal(null, err)
        assert.equal(0, res.deletedCount)

        col.deleteMany({'description':'not cleaninghouse'}, (err, res)=> {
            assert.equal(null,err)
            client.close()
            console.log('berhasil')
        })
    })
})