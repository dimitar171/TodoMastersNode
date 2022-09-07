const express = require('express')
const todos = require('../data/todos.json');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb')

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = "todosDB";
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');
            const db = client.db(dbName);
            const response = await db.collection('todos').insertMany(todos);
            const todos = await db.collection('todos').find().toArray();
            res.json(response);
        } catch (error) {
            debug(error.stack);
        }
    }())
});

module.exports = adminRouter;