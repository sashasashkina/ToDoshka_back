import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set title for task"],
  },
  description: {
    type: String,
    required: [true, "Set description for task"],
  },
  priority: {
    type: String,
    enum: ["without", "low", "medium", "high"],
    required: [true, "Set priority for task"],
    default: "without",
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: 'true'
},
  column: {
    type: Schema.Types.ObjectId,
    ref: 'column',
    required: 'true'
},
},   { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const Task = model("task", taskSchema);

export default Task;