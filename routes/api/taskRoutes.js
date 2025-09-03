const router = require("express").Router();
const Task = require("../../models/Task");
const Project = require("../../models/Project");
const { authMiddleware } = require("../../utils/auth");

router.use(authMiddleware);

async function ensureProjectOwned(req, res, projectId) {
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404).json({ message: "Project not found" });
    return null;
  }
  if (project.user.toString() !== req.user._id) {
    res.status(403).json({ message: "Forbidden: not project owner" });
    return null;
  }
  return project;
}
router.post("/projects/:projectId/tasks", async (req, res) => {
  try {
    const project = await ensureProjectOwned(req, res, req.params.projectId);
    if (!project) return;
    const task = await Task.create({ ...req.body, project: project._id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Create task failed", error: err.message });
  }
});
router.get("/projects/:projectId/tasks", async (req, res) => {
  try {
    const project = await ensureProjectOwned(req, res, req.params.projectId);
    if (!project) return;
    const tasks = await Task.find({ project: project._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Fetch tasks failed" });
  }
});
router.put("/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    const project = await ensureProjectOwned(req, res, task.project);
    if (!project) return;
    const updated = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});
router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    const project = await ensureProjectOwned(req, res, task.project);
    if (!project) return;
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;