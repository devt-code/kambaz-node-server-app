import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const result = dao.unenrollUserFromCourse(userId, courseId);
    res.json(result);
  };

  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete(
    "/api/users/:userId/courses/:courseId/unenroll",
    unenrollUserFromCourse
  );
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
}
