const Project = require("../helpers/projectModel.js");
const Action = require("../helpers/actionModel.js");

const validateProjectId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "Project not found; invalid id" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to process request" });
  }
};
const validateActionId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = await Action.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: "Action not found; invalid id" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to process request" });
  }
};
const validateProject = async (req, res, next) => {
  const { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes)
    return res.status(400).json({
      message: "An action requires a project_id, description, and notes."
    });

  const project = await Project.get(project_id);

  if (!project || Object.keys(project).length < 1)
    return res.status(400).json({ message: "Project not found; invalid id" });

  req.action = req.body;

  next();
};

const requiredBody = (req, res, next) => {
  if (req.body && Object.keys(req.body).length) {
    // go on to the next bit of middleware
    next();
  } else {
    // jump to a error handler bit of middleware
    next({ message: "Please include request body" });
    res.status(400).json({ message: "Please include request body" });
  }
};
module.exports = {
  validateProject,
  validateProjectId,
  validateActionId,
  requiredBody
};
