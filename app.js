const express = require('express');
const chalk = require('chalk');
const debug = require ('debug')('app');
const morgan = require('morgan');
const path=require('path');
const bodyParser= require('body-parser');
const methodOverride = require('method-override')


const PORT = process.env.PORT || 3000;
const app = express();
const todosRouter=require('./src/routers/todosRouter');
const adminRouter=require('./src/routers/adminRouter');

const { MongoClient, ObjectID } = require('mongodb');


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))


app.set('views','./src/views');
app.set('view engine','ejs');


app.use('/todos',todosRouter);
app.use('/admin',adminRouter);



app.get('/',(req, res)=>{
    res.render('index',{title:'TODO MASTERS'});
});

app.get('/create',(req,res)=>{
    res.render('create',{title:'TODO MASTERS'});
});

app.post('/create',(req,res)=> {
const url = 'mongodb://localhost:27017';
const dbName = "todosDB";

(async function mongo() {
    let client;
    try {
        client = await MongoClient.connect(url,{useUnifiedTopology: true});
        debug('Connected to the mongo DB');

        const db = client.db(dbName);

        let o1 = req.body;
        let o2 = {
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
          };
          let obj = { ...o1, ...o2 };
      
        await db.collection('todos').insertOne(obj);
        res.redirect('/todos');
    } catch (error) {
        debug(error.stack);
    }
    client.close();
})();
});

app.listen(PORT,()=>{
    debug(`listening on pport  ${chalk.green(PORT)}`);
});