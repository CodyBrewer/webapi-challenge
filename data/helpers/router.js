const express = require("express");

const Project = require("./projectModel.js");
const { validateId, requiredBody } = require("../middleware");
const router = express.Router();

router.use((req, res, next) => {
  console.log(" Project Router, whooo!");
  next();
});

router.get("/", async (req, res) => {
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

router.get("/:id", validateId, async (req, res) => {
  res.status(200).json(req.project);
});

module.exports = router;
