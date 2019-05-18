const express = require("express");
const {
  validateProject,
  validateActionId,
  requiredBody
} = require("../middleware");
const idBodyCheck = [validateActionId, requiredBody];
const Action = require("./actionModel.js");
const actionRouter = express.Router();

actionRouter.use((req, res, next) => {
  console.log(" Action Router, whooo!");
  next();
});

actionRouter.get("/", async (req, res) => {
  try {
    const action = await Action.get();
    res.status(200).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Projects"
    });
  }
});
actionRouter.get("/:id", validateActionId, async (req, res) => {
  res.status(200).json(req.action);
});

actionRouter.post("/", validateProject, requiredBody, async (req, res) => {
  try {
    const action = await Action.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error adding the action"
    });
  }
});
actionRouter.delete("/:id", validateActionId, async (req, res) => {
  try {
    const count = await Action.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The action has been cancelled" });
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error cancelling the action"
    });
  }
});

module.exports = actionRouter;
