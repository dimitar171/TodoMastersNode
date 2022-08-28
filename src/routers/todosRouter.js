const express = require('express');
const todos=require('../data/todos.json');

const todosRouter=express.Router();

todosRouter.route('/').get((req,res)=>{
    res.render('todos',{
        todos,
    });
});
todosRouter.route('/:id').get((req,res)=>{
    const id=req.params.id;
    res.render('details',{
        details:todos[id],
    });
});
todosRouter.route('/:id/edit').get((req,res)=>{
    const id=req.params.id;
    res.render('edit',{
        edit:todos[id],
    });
});

module.exports=todosRouter;