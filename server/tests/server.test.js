const expect = require('expect');
const st = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should save a new todo with valid data', (done) => {
        var text = 'Test todo route';

        st(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not save a new todo with invalid data', (done) => {
        st(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        st(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.docs.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return doc', (done) => {
        st(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if doc not found', (done) => {
        let hexId = new ObjectID().toHexString();
        st(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        st(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /toods/:id', () => {
    it('should delete doc', (done) => {
        let hexId = todos[1]._id.toHexString();
        st(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((doc) => {
                    expect(doc).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if doc not found', (done) => {
        let hexId = new ObjectID().toHexString();
        st(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        st(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo doc', (done) => {
        let hexId = todos[0]._id.toHexString();
        let text = "Some updated text";
        st(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(text);
                expect(res.body.doc.completed).toBe(true);
                expect(typeof res.body.doc.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();
        let text = "Some updated text";
        st(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(text);
                expect(res.body.doc.completed).toBe(false);
                expect(res.body.doc.completedAt).toBeFalsy();
            })
            .end(done);
    });
});