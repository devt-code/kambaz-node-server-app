import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao();

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignment = { ...req.body, course: courseId };
      const newAssignment = await dao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete(
    "/api/courses/:courseId/assignments/:assignmentId",
    async (req, res) => {
      try {
        const { assignmentId } = req.params;
        const result = await dao.deleteAssignment(assignmentId);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );

  app.put(
    "/api/courses/:courseId/assignments/:assignmentId",
    async (req, res) => {
      try {
        const { assignmentId } = req.params;
        const updates = req.body;
        const updated = await dao.updateAssignment(assignmentId, updates);
        if (!updated)
          return res.status(404).json({ error: "Assignment not found" });
        res.json(updated);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );
}
