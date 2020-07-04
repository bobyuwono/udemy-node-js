
const updateDocument = (db,callback) => {
    //get the document
    const collection = db.collection('documents')

    //update document dimana a adalah 2 dan mengeset b equal 1
    collection.updateOne( {'a':2} , { $set: {b:1}}, function (err,result){
        assert.equal(err,null)
        assert.equal(1, result.result.n)
        console.log("Updated the document with the field a equal to 2")
        callback(result)
    })
}

const findDocuments = (db, callback) =>{
    const collection = db.collection('documents')

    collection.find({}).toArray(function(err,docs){
        assert.equal(err,null)
        console.log("Found the following records")
        console.log(docs)
        callback(docs)
    })
}

const InsertDocuments = (db,callback) =>{
    //get the document collection
    const collection = db.collection('documents');
    //insert some documents
    collection.insertMany([
        {a:1}, {a:2}, {a:3}
    ], function(err,result){
        assert.equal(err, null)
        assert.equal(3, result.result.n)
        assert.equal(3, result.ops.length)
        console.log("Inserted 3 documents into the collection")
        callback(result)
    })
}

const removeDocument = (db, callback) => {
    const collection = db.collection('documents')

    collection.deleteMany( {}, function(err,result){
        assert.equal(err,null)
        // assert.equal(1, result.result.n)
        // console.log("removed the document with the field a equal to 3")
        callback(result)
    })
}

const indexCollection = (db, callback) => {
    //get the document
    db.collection('documents').createIndex( 
        {'a':3},
        null,
        function(err, results){
            console.log(results)
            callback()
        }
    )

}

MongoClient.connect(url, {useNewUrlParser : True}, (err, client) => 
//yang ini udah ada. cuma bedanya adalah yang ini versi dari documentation
// ada fungsi assert nya
{   
    assert.equal(null,err)
    console.log("Connected successfully to server")

    const db = client.db(dbName)
    findDocuments(db,function(){
        removeDocument(db,function(){
            client.close()
        })
        
    })
})