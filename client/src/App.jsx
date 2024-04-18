import React, { useState, useEffect } from "react";
import Edit from "./components/Edit";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // create
  const [note, setNote] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { note };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  // read
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // delete
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // update

  return (
    <div>
      <div>
        <div className=" bg-zinc-700 h-screen">
          <div className="p-4 sm:flex items-center justify-between">
            <h1 className="text-yellow-400 capitalize text-xl font-semibold">
              <a
                href="https://github.com/SwethaDSalvatore/cyberdude-challenges/tree/main/javascript/reactJS"
                target="blank"
              >
                Combine Note
              </a>
            </h1>
            <form
              className="flex items-center text-center justify-center"
              onSubmit={onSubmitForm}
            >
              <input
                className="bg-zinc-800 outline-none text-white capitalize px-4 py-2 rounded-l"
                type="text"
                placeholder="New Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button className="bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded-r font-bold">
                +
              </button>
            </form>
          </div>
          <div className="">
            <ul className="bg-zinc-700 shadow p-4 ">
              {todos.map((todo) => (
                <li
                  key={todo.todo_id}
                  className="flex justify-between  p-2 items-center border-t border-yellow-400 m-2 bg-zinc-800 shadow rounded"
                >
                  <h1 className="text-white capitalize">{todo.note}</h1>
                  <div className="space-x-5 flex">
                    <Edit todo={todo} />
                    <button
                      className=""
                      onClick={() => deleteTodo(todo.todo_id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="fill-current text-yellow-600 hover:text-yellow-500 w-7 h-7"
                      >
                        <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"></path>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-zinc-700">
          <p className="text-center text-yellow-400">
            Made by{" "}
            <a
              href="https://swethadsalvatore.github.io/"
              className="text-white font-semibold hover:underline"
              target="blank"
            >
              Swetha Ramesh{" "},
            </a>{" "}
            Buy me a Chaai
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
