import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
  async function findAssignmentsForCourse(courseId) {
    return await model.find({ course: courseId });
  }

  async function createAssignment(assignment) {
    const newAssignment = {
      ...assignment,
      _id: assignment._id || uuidv4(),
    };
    return await model.create(newAssignment);
  }

  async function deleteAssignment(assignmentId) {
    return await model.deleteOne({ _id: assignmentId });
  }

  async function updateAssignment(assignmentId, updates) {
    return await model.findByIdAndUpdate(
      assignmentId,
      { $set: updates },
      { new: true }
    );
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
