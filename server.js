const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(3001,()=>{
            console.log('Server started on port 3001');
        }); 
    })
    .catch((err)=>console.log(err))

/*mongoose.connect("mongodb://127.0.0.1:27017/mern-todo",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Connected to DB"))
.catch(console.error); */

const Todo = require('./models/Todo');

app.get('/todos', async(req, res)=> {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new', (req, res)=> {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id', async(req, res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.get('/todo/complete/:id', async(req,res)=>{
    const todo = await Todo.findById(req.params.id);
    console.log(req.params.id)
    console.log(todo)
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

//app.listen(3001,()=>console.log('Server started on port 3001'));

//mongodb+srv://josephanupsa:<password>@simplemern.qxvvcl2.mongodb.net/?retryWrites=true&w=majority