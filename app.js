const express = require('express');
const chalk = require('chalk');
const debug = require ('debug')('app');
const morgan = require('morgan');
const path=require('path');
const bodyParser= require('body-parser');
const methodOverride = require('method-override')
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000;
const app = express();
const todosRoutes=require('./src/routers/todosRoutes');



app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))


app.set('views','./src/views');
app.set('view engine','ejs');


app.use('/todos',todosRoutes);



app.get('/',(req, res)=>{
    res.render('index',{title:'TODO MASTERS'});
});


const DB = 'mongodb://localhost:27017/todosDB';
mongoose.connect(DB,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });
    
app.listen(PORT,()=>{
    debug(`listening on port  ${chalk.green(PORT)}`);
});