const express = require('express');
const server = express();
const users = ['Diego', 'Fábio', 'Nanque'];
server.use(express.json());

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();
  console.timeEnd('Request');
});

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if(!user) {
    return res.status(400).json({ error: 'User does not exists' });
  }

  req.user = user;

  return next();
}

function checkUserExists(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/user/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/user', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put('/user/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[ index ] = name;
  return res.json(users[index]);
});

server.delete('/user/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index);
  return res.send();
});

server.listen(3000);
