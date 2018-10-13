const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server', error);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    /*db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos Docs', JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('Unable to find Todos Docs');
    });*/

    db.collection('Todos').find().count().then((count) => {
        console.log('Todos count', count);
    }, (error) => {
        console.log('Unable to find Todos Docs');
    });
});