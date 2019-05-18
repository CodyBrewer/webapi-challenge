const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");

const helpersRouter = require("./data/helpers/router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger("dev"));

server.use("/api/helpers", helpersRouter);

server.get("/api", (req, res) => {
  res.send(`
    <h2> Welcome to API</h2>
    `);
});

module.exports = server;
