import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((error) => console.error("Failed to fetch todos:", error));
  }, []);

  const handleTodoComplete = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to update todo");
      }

      // Update the local state to reflect the change
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <CreateTodo
        onTodoCreated={() => {
          fetch("http://localhost:3000/todos")
            .then(async (res) => {
              const json = await res.json();
              setTodos(json.todos);
            });
        }}
      />
      <Todos todos={todos} onComplete={handleTodoComplete} />
    </div>
  );
}

export default App;
