const express = require('express');
const chalk = require('chalk');
const debug = require ('debug')('app');
const morgan = require('morgan');
const path=require('path');


const PORT = process.env.PORT || 3000;
const app = express();
const todosRouter=require('./src/routers/todosRouter');


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));

app.set('views','./src/views');
app.set('view engine','ejs')


app.use('/todos',todosRouter)



app.get('/',(req, res)=>{
    res.render('index',{title:'TODO MASTERS'});
});

app.get('/create',(req,res)=>{
    res.render('create',{title:'TODO MASTERS'});
});

app.listen(PORT,()=>{
    debug(`listening on pport  ${chalk.green(PORT)}`);
});