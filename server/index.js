const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); //req.body

// routes

// create
app.post("/todos", async (req, res) => {
  try {
    const { note } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (note) VALUES($1) RETURNING *",
      [note]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

// read all
app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (error) {
    console.error(err.message);
  }
});

// read specific
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

// update
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET note = $1 WHERE todo_id = $2",
      [note, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(err.message);
  }
});

// delete
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(err.message);
  }
});

// port
app.listen(5000, () => {
  console.log("server is running port 5000");
});
