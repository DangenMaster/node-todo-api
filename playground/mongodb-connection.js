const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server', error);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something more to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert to Todos', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});