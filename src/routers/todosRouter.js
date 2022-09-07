const express = require('express');
const debug = require('debug')('app:todosRouter');
const { MongoClient, ObjectID } = require('mongodb');


const todosRouter = express.Router();

todosRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = "todosDB";

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);
            const todos = await db.collection('todos').find().toArray();
            res.render('todos', { todos });
        } catch (error) {
            debug(error.stack);
        }
        client.close();
  })();
});

todosRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    const url = 'mongodb://localhost:27017';
    const dbName = "todosDB";

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);
            const todos = await db
            .collection('todos')
            .findOne({ _id: new ObjectID(id) });

            res.render('details', { 
                todos, 
            });
        } catch (error) {
            debug(error.stack);
        }
        client.close();
  })();
});

todosRouter.route('/:id/edit').get((req, res) => {
    const id = req.params.id;
    const url = 'mongodb://localhost:27017';
    const dbName = "todosDB";

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);
            const todos = await db
            .collection('todos')
            .findOne({ _id: new ObjectID(id) });

            res.render('edit', { 
                todos, 
            });
        } catch (error) {
            debug(error.stack);
        }
        client.close();
  })();
});

todosRouter.route('/:id/edit').put((req, res) => {
    const id = req.params.id;
    const url = 'mongodb://localhost:27017';
    const dbName = "todosDB";

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);
            const todos = await db
            .collection('todos')
            .findOne({ _id: new ObjectID(id) });

            await db.collection('todos').replaceOne(todos,req.body);
        res.redirect('/todos');
        } catch (error) {
            debug(error.stack);
        }
        client.close();
  })();
});

todosRouter.route('/:id/delete').delete((req, res) => {
    const id = req.params.id;
    const url = 'mongodb://localhost:27017';
    const dbName = "todosDB";

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);
            await db
            .collection('todos')
            .deleteOne({ _id: new ObjectID(id) });

            res.redirect('/todos');
        } catch (error) {
            debug(error.stack);
        }
        client.close();
  })();
});



module.exports = todosRouter;