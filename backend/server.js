const express = require('express');
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

let todos = [];

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send('Unauthorized');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username === 'user' && password === 'pass') {
    next();
  } else {
    return res.status(401).send('Unauthorized');
  }
};

app.use(authMiddleware);

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = { id: Date.now().toString(), ...req.body };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  todos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
  res.json(updatedTodo);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
