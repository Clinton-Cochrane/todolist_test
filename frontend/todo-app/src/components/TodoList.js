import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = ({ credentials }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/todos', {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })
      .then(response => response.json())
      .then(data => setTodos(data));
  }, [credentials]);

  const addTodo = (newTodo) => {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(addedTodo => setTodos([...todos, addedTodo]));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    }).then(() => setTodos(todos.filter(todo => todo.id !== id)));
  };

  const updateTodo = (id) => {
    const updatedTodo = prompt('Update todo:', todos.find(todo => todo.id === id).text);
    if (updatedTodo) {
      fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, text: updatedTodo })
      })
        .then(response => response.json())
        .then(updated => setTodos(todos.map(todo => (todo.id === id ? updated : todo))));
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onUpdate={updateTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
