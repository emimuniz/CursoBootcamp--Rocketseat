const express = require("express");
const server = express();

server.use(express.json());

let contador = 0;
const tarefas = [
  {
    id: "1",
    title: "Novo Projeto",
    taks: ["Nova tarega"]
  },
  {
    id: "2",
    title: "Estudar para Prova",
    taks: ["Nova tarefa"]
  }
];

server.use((req, res, next) => {
  contador++;
  console.log(`Contando requisições: ${contador}`);
  next();
});

function checkIdExists(req, res, next) {
  const id = tarefas[req.params.id];
  const idTarefa = tarefas.findIndex(p => p.id === id);
  if (!idTarefa) {
    return res.status(400).json({
      error: "Insira um id Valido"
    });
  }

  return next();
}

server.get("/tarefa/", (req, res) => {
  return res.json(tarefas);
});

server.get("/tarefa/:id", checkIdExists, (req, res) => {
  const id = req.params.id;
  const idTarefa = tarefas.findIndex(p => p.id === id);

  return res.json(tarefas[idTarefa]);
});

server.put("/tarefa/:id", checkIdExists, (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const idTarefa = tarefas.findIndex(p => p.id === id);
  tarefas[idTarefa] = body;
  return res.json(tarefas);
});

server.post("/tarefa", (req, res) => {
  const tarefa = req.body;
  tarefas.push(tarefa);
  return res.json(tarefas);
});

server.delete("/tarefa/:id", checkIdExists, (req, res) => {
  const id = req.params.id;

  const idTarefa = tarefas.findIndex(p => p.id === id);

  tarefas.splice(idTarefa, 1);
  return res.send();
});

server.listen(4000);
