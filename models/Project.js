const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = model("Project", projectSchema);