const router = require("express").Router();

router.use("/users", require("./userRoutes"));
router.use("/projects", require("./projectRoutes"));
router.use("/tasks", require("./taskRoutes"));

module.exports = router;