const router = require("express").Router();
const Project = require("../../models/Project");
const { authMiddleware } = require("../../utils/auth");

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const proj = await Project.create({ ...req.body, user: req.user._id });
    res.status(201).json(proj);
  } catch (err) {
    res.status(400).json({ message: "Create failed", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

async function loadProjectOr403(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  if (project.user.toString() !== req.user._id) return res.status(403).json({ message: "Forbidden" });
  return project;
}

router.get("/:id", async (req, res) => {
  const project = await loadProjectOr403(req, res);
  if (!project) return;
  res.json(project);
});

router.put("/:id", async (req, res) => {
  const project = await loadProjectOr403(req, res);
  if (!project) return;
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const project = await loadProjectOr403(req, res);
  if (!project) return;
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

module.exports = router;