const Project = require("../helpers/projectModel.js");

async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Project.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ message: "Project not found; invalid id" });
      res.status(404).json({ message: "Project not found; invalid id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to process request" });
  }
}

function requiredBody(req, res, next) {
  if (req.body && Object.keys(req.body).length) {
    // go on to the next bit of middleware
    next();
  } else {
    // jump to a error handler bit of middleware
    next({ message: "Please include request body" });
    res.status(400).json({ message: "Please include request body" });
  }
}
module.exports = { validateId, requiredBody };
