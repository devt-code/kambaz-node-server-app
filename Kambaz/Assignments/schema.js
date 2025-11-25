import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    points: Number,
    fromDate: { type: Date, default: Date.now },
    dueDate: Date,
    until: Date,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
