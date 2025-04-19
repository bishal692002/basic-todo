const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if (!parsePayload.success) {
        return res.status(411).json({ msg: "Invalid input" });
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    });
    res.json({ msg: "Todo created" });
});

app.get('/todos', async (req, res) => {
    const todos = await todo.find({});
    res.json({ todos });
});

app.put('/completed', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ msg: "Todo ID is required" });
        }

        const updatedTodo = await todo.findByIdAndUpdate(
            id,
            { $set: { completed: true } },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.json({ msg: "Todo marked as completed", todo: updatedTodo });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ msg: "Failed to update todo", error: error.message });
    }
});

app.listen(3000);
