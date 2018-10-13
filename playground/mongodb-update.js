const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server', error);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bc2543ef656302704b72a76')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log('Updated Doc', JSON.stringify(result, undefined, 2));
    }, (error) => {
        console.log('Unable to Update Doc');
    });
});