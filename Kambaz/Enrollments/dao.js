import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function EnrollmentsDao(db) {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }

  // function enrollUserInCourse(userId, courseId) {
  //   const exists = enrollments.find(
  //     (e) => e.user === userId && e.course === courseId
  //   );
  //   if (exists) return exists;
  //   const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  //   enrollments.push(newEnrollment);
  //   return newEnrollment;
  // }

  // function enrollUserInCourse(userId, courseId) {
  //   return model.create({
  //     user: userId,
  //     course: courseId,
  //     _id: `${userId}-${courseId}`,
  //   });
  // }

  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }

  // function unenrollUserFromCourse(userId, courseId) {
  //   const index = enrollments.findIndex(
  //     (e) => e.user === userId && e.course === courseId
  //   );
  //   if (index !== -1) enrollments.splice(index, 1);
  //   return { status: "unenrolled" };
  // }

  // function unenrollUserFromCourse(user, course) {
  //   return model.deleteOne({ user, course });
  // }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  async function findEnrollmentsForUser(userId) {
    // return enrollments.filter((e) => e.user === userId);
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    unenrollAllUsersFromCourse,
  };
}
