import React, { useState, useEffect } from "react";
const BASE_URL = "https://localhost:44349/api/";
export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const handleDesChange = (e) => {
    setDescription(e.target.value);
  };
  const createToDo = () => {
    fetch(BASE_URL + "todo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IsComplete: false,
        Description: description,
        Priority: 3,
        CreatedOn: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setDescription("");
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchTodos = () => {
    fetch(BASE_URL + "todo", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('bearer-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        console.log(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteToDo = (id) => {
    fetch(BASE_URL + "todo/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateToDo = (id, checked) => {
    fetch(BASE_URL + "todo/myedit", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
        IsComplete: checked,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setDescription("");
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // triggers any time the page is reloaded
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <h1>To Do</h1>
      <input type="text" value={description} onChange={handleDesChange} />
      <button className="button" onClick={createToDo}>
        Create
      </button>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Is Complete</th>
            <th>Id</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <input
                type="checkbox"
                value={todo.IsComplete}
                checked={todo.IsComplete}
                onChange={(e) => updateToDo(todo.id, e.target.checked)}
              />
              <td>{todo.isComplete && <span>Yes</span>}</td>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{todo.priority}</td>
              <td>{todo.createdOn}</td>
              <td>
                <button
                  className="button is-danger"
                  onClick={() => deleteToDo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}