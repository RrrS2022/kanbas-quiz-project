import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

function WorkingWithArrays() {
  const [errorMessage, setErrorMessage] = useState(null);
  const API_BASE = process.env.REACT_APP_API_BASE;

  const API = `${API_BASE}/a5/todos`;
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  type Todo = {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
  };

  const [todos, setTodos] = useState<any[]>([]);

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };

  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };

  const removeTodo = async (todo: Todo) => {
    const response = await axios
      .get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };

  const fetchTodoById = async (id: number) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };

  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      const response = await axios.delete(
        `${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || "An unexpected error occurred");
      }
    };
  }


  const updateTodo = async () => {
    try {
      const response = await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || "An unexpected error occurred");
      }
    }

  };



  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving an Item from an Array by ID</h4>
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
      <input value={todo.id}
        onChange={(e) => setTodo({
          ...todo,
          id: Number(e.target.value)
        })} />

      <input type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value
        })} />

      <textarea value={todo.description}
        onChange={(e) => setTodo({
          ...todo,
          description: e.target.value
        })} />
      <input value={todo.due} type="date"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value
        })} />
      <label>
        <input checked={todo.completed} type="checkbox"
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked
          })} />
        Completed
      </label>
      <button onClick={postTodo}> Post Todo </button>

      <button onClick={createTodo} >
        Create Todo
      </button>

      <button onClick={updateTitle} >
        Update Title
      </button>

      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <input checked={todo.completed}
              type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            <button onClick={() => fetchTodoById(todo.id)} >
              Edit
            </button>
            <button onClick={() => removeTodo(todo)} >
              Remove
            </button>
            <button onClick={() => deleteTodo(todo)}
              className="btn btn-danger float-end ms-2">
              Delete
            </button>
            <button onClick={updateTodo}
              className="btn btn-secondary float-end ms-2">
              Update Todo
            </button>
            {todo.title}
          </li>
        ))}
      </ul>

      <h4>Retrieving Arrays</h4>
      <a href={API}>
        Get Todos
      </a>






      <h3>Updating an Item in an Array</h3>
      <a href={`${API}/${todo.id}/title/${todo.title}`} >
        Update Title to {todo.title}
      </a>

      <h3>Updating an Completed in an Array</h3>
      <a href={`${API}/${todo.id}/completed/${todo.completed}`}>
        Update Completed to {todo.completed}
      </a>
      <input type="checkbox" checked={todo.completed}
        onChange={(e) => setTodo({
          ...todo,
          completed: e.target.checked
        })}
      />

      <h3>Updating an description in an Array</h3>
      <a href={`${API}/${todo.id}/description/${todo.description}`}>
        Update description to {todo.description}
      </a>
      <input type="text" value={todo.description}
        onChange={(e) => setTodo({
          ...todo, description: e.target.value
        })} />

      <h3>Get Todo by ID</h3>
      <a href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>

      <h3>Filtering Array Items</h3>
      <a href={`${API}?completed=true`}>
        Get Completed Todos
      </a>

      <h3>Creating new Items in an Array</h3>
      <a href={`${API}/create`}>
        Create Todo
      </a>

      <h3>Deleting from an Array</h3>
      <a href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>

    </div>
  );
}
export default WorkingWithArrays;