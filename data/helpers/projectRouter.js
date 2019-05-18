const express = require("express");

const Project = require("./projectModel.js");
const { validateId, requiredBody } = require("../middleware");
const idBodyCheck = [validateId, requiredBody];
const projectRouter = express.Router();

projectRouter.use((req, res, next) => {
  console.log(" Project Router, whooo!");
  next();
});

projectRouter.get("/", async (req, res) => {
  try {
    const project = await Project.get();
    res.status(200).json(project);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Projects"
    });
  }
});
projectRouter.get("/:id", validateId, async (req, res) => {
  res.status(200).json(req.project);
});

projectRouter.post("/", requiredBody, async (req, res) => {
  try {
    const project = await Project.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error adding the project"
    });
  }
});

projectRouter.delete("/:id", validateId, async (req, res) => {
  try {
    const count = await Project.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The project has been cancelled" });
    } else {
      res
        .status(404)
        .json({ message: "The project could not be found, probably funding" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error cancelling the project"
    });
  }
});

projectRouter.put("/:id", idBodyCheck, async (req, res) => {
  try {
    const project = await Project.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error updating the project"
    });
  }
});

module.exports = projectRouter;
