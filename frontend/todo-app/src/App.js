import React, { useState } from 'react';
import TodoList from './components/TodoList';
import Login from './components/Login';

function App() {
  const [credentials, setCredentials] = useState(null);

  const handleLogin = (username, password) => {
    setCredentials(btoa(`${username}:${password}`));
  };

  return (
    <div className="App">
      {credentials ? (
        <TodoList credentials={credentials} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
