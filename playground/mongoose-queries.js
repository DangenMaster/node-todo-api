const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

let id = '6bc6df6ac2fdef19c41da9a6';

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos: ', todos);
}).catch((e) => {
    console.log('Error:', e);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo: ', todo);
}).catch((e) => {
    console.log('Error:', e);
});

Todo.findById(id).then((todo) => {
    console.log('Todo by id: ', todo);
}).catch((e) => {
    console.log('Error:', e);
});