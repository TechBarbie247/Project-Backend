const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true }
}, { timestamps: true });

module.exports = model("Task", taskSchema);