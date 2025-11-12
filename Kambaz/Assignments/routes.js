import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  // GET all assignments for a course
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // CREATE new assignment
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = { ...req.body, course: courseId };
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  });

  // DELETE assignment
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const result = dao.deleteAssignment(assignmentId);
    res.json(result);
  });

  // UPDATE assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body;
    const updated = dao.updateAssignment(assignmentId, updates);
    if (!updated) return res.status(404).send("Assignment not found");
    res.json(updated);
  });
}
