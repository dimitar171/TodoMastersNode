const mongoose = require('mongoose');

const todoSchema=new mongoose.Schema({
    title:{
        type: String,
        required:[true, 'Todo must have a name'],
        maxLength: 20
    },
    description:{
        type: String
    },
    dueDate:{
        type:Date
    },
    status:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo',todoSchema)

module.exports=Todo;