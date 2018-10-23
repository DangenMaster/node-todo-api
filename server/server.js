const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((docs) => {
        res.send({ docs });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    let { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send({ doc });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = { app };