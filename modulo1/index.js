//importando o express
const express = require("express");

//Iniciando a aplicação no servidor
//chamando a função express
const server = express();
//ler o json no corpo da requisição
server.use(express.json());

//localhost:3000/teste
//req : Todos os dados da nossa requisição
//res :  Todas as informações de retonrno para cliente

//Temos três tipos de parametros:
//Query params = ?teste=1
//Route params = /users/1
//Request body = {"name": "Diego", "email": "curso.bootcamp@hotmail.com"}
//CRUD - Create, Read, Update, Delete

const users = ["Diego", "Claudio", "Victor"];
//Middlewares: uma camada que ajuda duas aplicações, partes, sistemas, a se comunicarem.
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);

  next();
  console.timeEnd("Request");
});

//Verificando se name foi passado
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User não passado no body" });
  }

  return next();
}

//Verificando se o id passado é valido
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "Insira User Valido" });
  }

  req.user = user;
  return next();
}

//Get
server.get("/users/", (req, res) => {
  return res.json(users);
});

//Get por Id
server.get("/users/:index", checkUserInArray, (req, res) => {
  //res.send("Hello");
  //const nome = req.query.nome;
  const index = req.params.index;

  return res.json(req.user);
});

//Criando um novo usuario
server.post("/users", checkUserExists, (req, res) => {
  const name = req.body.name;

  users.push(name);
  return res.json(users);
});

//Editando um usuario
server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const index = req.params.index;
  const name = req.body.name;

  users[index] = name;
  return res.json(users);
});

//Deletando um usuario
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const index = req.params.index;

  users.splice(index, 1);
  return res.send();
});

//Servidor sendo escutado na porta 3000
server.listen(3000);
