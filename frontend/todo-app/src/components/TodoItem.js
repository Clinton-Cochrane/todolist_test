import React from 'react';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  return (
    <li>
      <span>{todo.text}</span>
      <button onClick={() => onUpdate(todo.id)}>Update</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
