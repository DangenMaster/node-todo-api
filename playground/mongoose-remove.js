const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

let id = '5bd160d347150f1b98854088';

/*Todo.deleteMany({}).then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log(e);
});*/

/*Todo.deleteOne({text: 'Something todo from postman'}).then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log(e);
});*/

Todo.findByIdAndDelete(id).then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log(e);
});

/*Todo.findOneAndDelete({text: 'Something todo from postman'}).then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log(e);
});*/