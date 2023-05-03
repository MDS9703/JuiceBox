const PORT = 3000;
const express = require("express");
const server = express();
const apiRouter = require("./api");
server.use("/api", apiRouter);

const { Client } = require("pg");

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");
  next();
});

const client = new Client("postgres://localhost:5432/juicebox-dev");
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
