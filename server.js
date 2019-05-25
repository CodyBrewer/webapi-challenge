const express = require("express");
const helmet = require("helmet");
// const logger = require("morgan");
const cors = require("cors");

const projectRouter = require("./data/helpers/projectRouter.js");
const actionRouter = require("./data/helpers/actionRouter.js");
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
// server.use(logger("dev"));

server.use("/api/projects", projectRouter);
server.use("/api/projects/:id/actions", actionRouter);

server.get("/api", (req, res) => {
  res.send(`
    <h2> Welcome to API</h2>
    `);
  res;
});

module.exports = server;
